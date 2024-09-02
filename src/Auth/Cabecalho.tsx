import React from 'react';

interface HeaderProps {
  user: { name: string } | null;
  handleLogin: () => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogin, handleLogout }) => {
  return (
    <div className="header">
        <div className="auth-container">
            {user ? (
                <div className="user-info">
                    <p className="welcome">Welcome, {user.name}!</p>
                    <button className="auth-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
            <button className="auth-button" onClick={handleLogin}>Login</button>
            )}
        </div>
    </div>
  );
};

export default Header;