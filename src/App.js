import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateSession from './components/CreateSession';
import SessionRoom from './components/SessionRoom';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to Cabo!</h1>
        <p>Let's lock in 😈</p>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<CreateSession />} />
          <Route path="/session/:sessionId" element={<SessionRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;