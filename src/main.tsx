// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import LoginPage from './pages/Login';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

const Main: React.FC = () => {
  // State to manage authentication
  const [authenticated, setAuthenticated] = React.useState(false);

  // Callback to set authentication state when login is successful
  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <Router> {/* Wrap your entire application with BrowserRouter */}
      <React.StrictMode>
        {authenticated ? (
          <App />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </React.StrictMode>
    </Router>
  );
};

root.render(<Main />);
