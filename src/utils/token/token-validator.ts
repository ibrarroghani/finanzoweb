import { jwtDecode } from 'jwt-decode';

interface IDecodeToken {
  exp?: number;
}

export const checkTokenIsValid = (token: string): boolean => {
  if (!token) return false;

  const { exp } = jwtDecode<IDecodeToken>(token);
  if (!exp) return false;
  return exp * 1000 > Date.now();
};
