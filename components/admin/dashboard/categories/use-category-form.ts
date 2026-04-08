import { useState } from "react";
import { addCategoryRequest } from "./add-category-service";
import { useAuth } from "@/context/AuthContext";

export const useCategoryForm = () => {
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const { token } = useAuth();
    
      const createCategory = async (data: any) => {
        try {
          setLoading(true);
          setError(null);

          if (!token) return;
    
          const response = await addCategoryRequest(data, token);
    
          return response;
        } catch (err: any) {
          setError(err.message || 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
    
      return { createCategory, loading, error };
}