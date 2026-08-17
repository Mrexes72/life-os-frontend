import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      padding: '15px',
      background: '#2c3e50',
      color: 'white'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Hjem
      </Link>
      <Link to="/habits" style={{ color: 'white', textDecoration: 'none' }}>
        Mine Vaner
      </Link>
      <Link to="/habitsCreated" style={{ color: 'white', textDecoration: 'none' }}>
        Oppret vane
      </Link>
      <Link to="/meetingroom" style={{ color: 'white', textDecoration: 'none' }}>
        Mine møterom
      </Link>
      <Link to="/meetingroomCreated" style={{ color: 'white', textDecoration: 'none' }}>
        Opprett møterom
      </Link>
      <Link to="/om" style={{ color: 'white', textDecoration: 'none' }}>
        Om appen
      </Link>
    </nav>
  )
}