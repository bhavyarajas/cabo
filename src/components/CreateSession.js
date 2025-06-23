/*
This component:
	1.	Reads the session ID and user ID from the URL
	2.	Listens to Firebase for real-time updates to the session
	3.	Lets players join the game (if it’s not locked)
	4.	Displays player list
	5.	Lets the host press “Ready” to lock the room
	6.	Lets the host press “Start Game” after locking the room
*/
import React from 'react';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function CreateSession() {
  const navigate = useNavigate();

  const handleCreate = async () => {
    //This generates a short, unique ID to identify the game room (like abc123).
    const sessionId = uuidv4().slice(0, 6);
    //Creates a unique ID for the host (you’ll also use this for players who join).
    const userId = uuidv4();

    //Writes an object to the Firebase DB, adds game state
    await set(ref(db, `sessions/${sessionId}`), {
      createdBy: userId,
      isLocked: false,
      gameStarted: false,
      players: {
        [userId]: {
          name: "Host",
          joinedAt: Date.now()
        }
      }
    });

    //Takes the user to the game room screen, passing the session ID and their UID in the URL.
    navigate(`/session/${sessionId}?uid=${userId}`);
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Ready to Play?</h2>
        <p>Create a new game session and invite friends!</p>

        <div className="action-buttons">
          <button className="create-btn" onClick={handleCreate}>
            Create New Session
          </button>
        </div>

        <div className="game-info">
          <h3>How to Play:</h3>
        </div>
      </div>
    </div>
  );
}