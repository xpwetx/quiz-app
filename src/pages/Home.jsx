import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <h1>LET'S GET QUIZZICAL!</h1>
      <Link to="/quiz">
        <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>Start Quiz</button>
      </Link>
    </div>
  );
}

