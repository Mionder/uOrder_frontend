export const addCategoryRequest = async (data: any, token: string): Promise<any> => {
  const res = await fetch('http://localhost:3000/v1/admin/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Токен беремо з кук (cookies())
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Creation of category failed');
  }

  return res.json();
};