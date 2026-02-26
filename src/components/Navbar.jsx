import { BiMoon, BiSun } from 'react-icons/bi';

export default function Navbar({ theme, toggleTheme }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <div className="logo-icon">FB</div>
                <span>FlowBuild</span>
            </div>

            <div className="navbar-links">
                <a href="#">Features</a>
                <a href="#">Templates</a>
                <a href="#">Pricing</a>
            </div>

            <div className="navbar-actions">
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                    {theme === 'dark' ? <BiSun size={20} /> : <BiMoon size={20} />}
                </button>
                <button className="login-btn">Log In</button>
            </div>
        </nav>
    );
}
