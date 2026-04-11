import { useState } from "react";
import { addMenuItemRequest } from "./add-menu-item-service";
import { useAuth } from "@/context/AuthContext";

export const useAddMenuItemForm = () => {
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const { token } = useAuth();
    
      const createMenuItem = async (data: any) => {
        try {
          setLoading(true);
          setError(null);
          if (!token) return;
    
          const response = await addMenuItemRequest(data, token);
    
          return response;
        } catch (err: any) {
          setError(err.message || 'Unknown error');
        } finally {
          setLoading(false);
        }
      };

      const handleSubmit = async (formData: any, e: any) => {
        e.preventDefault();
        try {
            const imageFile = formData.get('file'); // файл з інпуту
            const uploadData = new FormData();
            uploadData.append('image', imageFile);

            const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/menu/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: uploadData,
            });
            
            const { url } = await uploadRes.json();

  // 2. Створюємо страву з отриманим URL
            const menuItemData = {
                name: { uk: formData.get('name_uk'), en: formData.get('name_en') },
                price: Number(formData.get('price')),
                weight: formData.get('weight'),
                description: { uk: formData.get('desc_uk'), en: formData.get('desc_en') },
                categoryId: formData.get('categoryId'),
                image: url, // ПІДСТАВЛЯЄМО URL З CLOUDINARY
            };

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/menu`, {
                method: 'POST',
                headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify(menuItemData),
            });
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
      }
    
      return { handleSubmit, loading, error };
}