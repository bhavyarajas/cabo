// src/components/SessionRoom.js
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

export default function SessionRoom() {
  //Extracts the session ID from the route (/session/:sessionId)
  //Extracts the user ID from the URL query string (?uid=abc...)
  const { sessionId } = useParams();
  const [params] = useSearchParams();
  const uid = params.get('uid');


  const [session, setSession] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    //Listens in real-time to changes in the session data
    //Updates the session state anytime something changes (e.g., someone joins)
    const sessionRef = ref(db, `sessions/${sessionId}`);
    return onValue(sessionRef, (snapshot) => {
      setSession(snapshot.val());
    });
  }, [sessionId]);

  const handleJoin = async () => {
    const yourName = prompt("Enter your name:");
    setName(yourName);

    //Adds a new player to the session under players with their name and join time
    await update(ref(db, `sessions/${sessionId}/players/${uid}`), {
      name: yourName,
      joinedAt: Date.now()
    });
  };

  const handleLock = () => {
    //When the host clicks “Ready”, this locks the room so no one else can join.
    update(ref(db, `sessions/${sessionId}`), { isLocked: true });
  };

  const handleStartGame = () => {
    //Host starts the game — this sets a flag that you’ll later use to trigger game logic.
    update(ref(db, `sessions/${sessionId}`), { gameStarted: true });
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h2>Session ID: {sessionId}</h2>
      <p>
        Share this link:{" "}
        <code>{window.location.href.replace('localhost', window.location.hostname)}</code>
      </p>
      <h3>Players:</h3>
      <ul>
        {session.players && Object.entries(session.players).map(([id, p]) => (
          <li key={id}>{p.name}</li>
        ))}
      </ul>

      {!session.players?.[uid] && !session.isLocked && (
        <button onClick={handleJoin}>Join Game</button>
      )}

      {uid === session.createdBy && !session.isLocked && (
        <button onClick={handleLock}>Ready (Lock Room)</button>
      )}

      {session.isLocked && !session.gameStarted && uid === session.createdBy && (
        <button onClick={handleStartGame}>Start Game</button>
      )}

      {session.gameStarted && <p>Game Started! (TODO: implement game logic)</p>}
    </div>
  );
}