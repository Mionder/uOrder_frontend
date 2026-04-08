import { v4 as uuidv4 } from 'uuid';

export const getGuestId = () => {
  if (typeof window === 'undefined') return '';
  
  let guestId = localStorage.getItem('uorder_guest_id');
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('uorder_guest_id', guestId);
  }
  return guestId;
};