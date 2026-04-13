// src/components/cart-modal.tsx
'use client';
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "../admin/dashboard/menu/hooks/use-cart";// або де ти його створив
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const CartModal = ({ isOpen, onClose, tenant }: any) => {
  const { tr, t } = useLanguage();
  const { items, addItem, removeItem, clearCart } = useCart();
  
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Content */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[40px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic tracking-tighter">
            {tr('cart.title') || 'Ваше замовлення'}
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <ShoppingBag size={48} className="text-gray-200" />
            <p className="text-gray-400 font-medium">{tr('cart.empty') || 'Кошик порожній'}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-black leading-tight">{t(item.name)}</span>
                    <span className="text-sm text-gray-500 font-bold">{item.price} {tenant.currency}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl border border-gray-100">
                    <button onClick={() => removeItem(item.id)} className="text-gray-400">
                      <Minus size={16} />
                    </button>
                    <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addItem(item)} className="text-black">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-end mb-6">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">{tr('cart.total')}</span>
                <span className="text-3xl font-black italic tracking-tighter" style={{ color: tenant.mainColor }}>
                  {total} {tenant.currency}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};