import { useState } from "react";

export const useRegister = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registrationRequest = async (data: any) => {
        const res = await fetch('http://localhost:3000/v1/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Registration failed');
        }

        return res.json();
    }

    const registerUser = async (data: any) => {
    try {
        setLoading(true);
        setError(null);

        const response = await registrationRequest(data);

        // 👉 зберігаємо токен (простий варіант)
        localStorage.setItem('token', response.accessToken);

        return response;
        } catch (err: any) {
        setError(err.message || 'Unknown error');
        } finally {
        setLoading(false);
        }
    };

    return { registerUser, loading, error }

}