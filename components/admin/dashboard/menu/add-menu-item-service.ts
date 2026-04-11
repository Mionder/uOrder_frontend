export const addMenuItemRequest = async (data: any, token: string): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Токен беремо з кук (cookies())
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Creation of menu item failed');
  }

  return res.json();
};