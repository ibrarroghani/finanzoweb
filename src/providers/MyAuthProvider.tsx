import React, { useState, useContext, createContext } from 'react';
import { useMsal } from '@azure/msal-react';
import ApiService from '@/utils/services/api-service';
import { notification } from 'antd';

// Define the type for the context state
interface MyAuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>; // Add logout function to context
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: any;
}

const MyAuthContext = createContext<MyAuthContextType | null>(null);

export const useMyAuth = () => {
  const context = useContext(MyAuthContext);
  if (!context) {
    throw new Error('useMyAuth must be used within a MyAuthProvider');
  }
  return context;
};

export const MyAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { instance, accounts, inProgress } = useMsal();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    if (inProgress !== 'none') return;

    try {
      const response = await instance.loginPopup();
      const accessToken = response.accessToken;
      const msalUser = accounts[0];

      const res = await ApiService.post('/auth/login', {
        name: msalUser.name,
        email: msalUser.username,
        accessToken: accessToken,
      });

      const { user: backendUser, accessToken: validatedBackendToken } =
        res.data;

      sessionStorage.setItem('user', JSON.stringify(backendUser));
      sessionStorage.setItem('accessToken', validatedBackendToken);

      setUser(backendUser);
      setIsAuthenticated(true);
      ApiService.defaults.headers['Authorization'] =
        `Bearer ${validatedBackendToken}`;

      setLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
      notification.error({
        message: 'Login Failed',
        description: 'There was an issue logging in. Please try again.',
        placement: 'topRight',
      });
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      // Perform MSAL logout
      await instance.logoutRedirect();
      sessionStorage.clear();
      localStorage.clear();

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      notification.error({
        message: 'Logout Failed',
        description: 'There was an issue logging out. Please try again.',
        placement: 'topRight',
      });
    }
  };

  return (
    <MyAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        setLoading,
        instance,
      }}
    >
      {children}
    </MyAuthContext.Provider>
  );
};
