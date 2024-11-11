'use client';

import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../../config/msalConfig';
import { useEffect, useState } from 'react';

const LoginPage: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className='flex h-screen flex-col items-center justify-center'>
      {isAuthenticated && user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.mail || user.userPrincipalName}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button
          className='rounded-md bg-gray-500 p-4 text-white'
          onClick={handleLogin}
        >
          Login with Azure AD
        </button>
      )}
    </div>
  );
};

export default LoginPage;
