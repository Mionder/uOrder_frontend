'use client';

import { useState } from 'react';
import { loginRequest } from './auth.service';
import { LoginDto } from './types';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginDto) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginRequest(data);

      // 👉 зберігаємо токен (простий варіант)
      localStorage.setItem('token', response.access_token);

      return response;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};