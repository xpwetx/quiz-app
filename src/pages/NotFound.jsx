import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 -- Page not found</h1>
            <p style={{
                 fontSize: '1.25rem', marginBottom: '2rem'
            }}>The page you're looking for doesn't exist.</p>
            <Link to='/'>
            <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>Go back home.</button></Link>
        </div>
    )
};