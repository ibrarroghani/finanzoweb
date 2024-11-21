import { jwtDecode } from 'jwt-decode';

interface DecodeToken {
  exp?: number;
}

export const checkTokenIsValid = (token: string): boolean => {
  if (!token) return false;

  const { exp } = jwtDecode<DecodeToken>(token);
  if (!exp) return false;
  return exp * 1000 > Date.now();
};
