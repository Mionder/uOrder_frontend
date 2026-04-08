import { LoginDto, AuthResponse } from './types';

export const loginRequest = async (data: LoginDto): Promise<AuthResponse> => {
  const res = await fetch('http://localhost:3000/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json();
};