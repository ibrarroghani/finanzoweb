'use client';

import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../../config/msalConfig';
import { useEffect, useState } from 'react';

const LoginPage: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState<any>(null);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((error) => {
      console.error('Login failed:', error);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch((error) => {
      console.error('Logout failed:', error);
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      instance
        .acquireTokenSilent(loginRequest)
        .then((response) => {
          const accessToken = response.accessToken;

          fetch('https://graph.microsoft.com/v1.0/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((profile) => setUser(profile))
            .catch((error) =>
              console.error('Failed to fetch user profile:', error)
            );
        })
        .catch((error) => {
          console.error('Token acquisition failed:', error);
        });
    }
  }, [isAuthenticated, instance]);

  return (
    <div>
      <h1>Login Page</h1>
      {isAuthenticated && user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.mail || user.userPrincipalName}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Azure AD</button>
      )}
    </div>
  );
};

export default LoginPage;
