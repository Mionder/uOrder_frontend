export const deleteCategoryRequest = async (id: string, token: string): Promise<any> => {
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Токен беремо з кук (cookies())
    },
  });

  if (!res.ok) {
    throw new Error('Delete menu item failed');
  }

  return res.json();
};