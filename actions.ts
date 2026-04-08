'use server'
import { revalidatePath } from 'next/cache'

export async function refreshMenu(slug: string) {
  // Ця команда очищує кеш для вказаного шляху
  revalidatePath(`/admin/dashboard`);
  // Або для публічного меню
  revalidatePath(`/${slug}`);
}