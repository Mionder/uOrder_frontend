import { Plus } from "lucide-react";
import { useState } from "react";

export const MenuItemCard = ({ item }: any) => {
  // Визначаємо, яку ціну показати спочатку
  const hasVariants = item.variants && item.variants.length > 0;
  const displayPrice = hasVariants 
    ? Math.min(...item.variants.map((v: any) => v.price)) 
    : item.basePrice;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? item.variants[0] : null
  );

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="relative h-40 w-full rounded-2xl overflow-hidden">
        <img src={item.image} alt={item.name.uk} className="object-cover w-full h-full" />
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-lg leading-tight">{item.name.uk}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">{item.description?.uk}</p>
      </div>

      {/* Перемикач варіантів */}
      {hasVariants && (
        <div className="flex flex-wrap gap-2 py-2">
          {item.variants.map((v: any) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedVariant?.id === v.id 
                ? 'bg-black text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {v.label.uk}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xl font-black">
          {selectedVariant ? selectedVariant.price : displayPrice} ₴
        </span>
        <button className="bg-blue-600 text-white p-2 rounded-xl hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};