/* eslint-disable no-console */
'use client';

import useAuth from '@/hooks/auth/useAuth';
// import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../../config/msal/msalConfig';
import { useState } from 'react';

// Define an interface to represent the user's profile data structure
// interface UserProfile {
//   displayName: string;
//   mail?: string;
//   userPrincipalName?: string;
// }

const LoginPage: React.FC = () => {
  const { instance, isAuthenticated, user } = useAuth();

  console.log('user', user);
  // const isAuthenticated = useIsAuthenticated();
  // const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        console.log('response', response);
        //instance.setActiveAccount(response.account); // Set the active account after login
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setError('Login failed. Please try again.');
      });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch((error) => {
      console.error('Logout failed:', error);
      setError('Logout failed. Please try again.');
    });
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const activeAccount = instance.getActiveAccount(); // Retrieve the active account

  //     if (activeAccount) {
  //       instance
  //         .acquireTokenSilent(loginRequest)
  //         .then((response) => {
  //           const accessToken = response.accessToken;

  //           return fetch('https://graph.microsoft.com/v1.0/me', {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           });
  //         })
  //         .then((res) => {
  //           console.log('res', res);
  //           if (!res.ok) {
  //             throw new Error(`Error fetching profile: ${res.statusText}`);
  //           }
  //           return res.json();
  //         })
  //         .then((profile: UserProfile) => {
  //           setUser(profile);
  //           setError(null); // Clear any previous errors
  //         })
  //         .catch((error) => {
  //           console.error(
  //             'Failed to fetch user profile or acquire token:',
  //             error
  //           );
  //           setError('Failed to fetch user profile. Please try again.');
  //         });
  //     } else {
  //       console.error('No active account found');
  //       setError('No active account found. Please log in again.');
  //     }
  //   }
  // }, [isAuthenticated, instance]);

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {error && <p className='text-red-500'>{error}</p>}

      {isAuthenticated && user ? (
        <>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button
          className='rounded-md bg-blue-500 p-4 text-white shadow-md hover:bg-blue-400'
          onClick={handleLogin}
        >
          Login with Azure AD
        </button>
      )}
    </div>
  );
};

export default LoginPage;
