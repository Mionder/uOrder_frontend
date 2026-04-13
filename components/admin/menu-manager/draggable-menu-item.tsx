import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useLanguage } from '@/context/LanguageContext';
import { Pencil, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { refreshMenu } from '@/actions';

export const DraggableMenuItem = ({ item, index, token, slug, setSelectedItem, currencySymbol }: any) => {
  const { t } = useLanguage();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if(!confirm(`Видалити страву "${t(item.name)}"?`)) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/menu/${item.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if(res.ok) await refreshMenu(slug);
  };

  const currentPrice = item.variants?.length > 0 
    ? Math.min(...item.variants.map((v: any) => v.price)) 
    : item.basePrice;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white border rounded-2xl transition-all ${
            snapshot.isDragging ? 'shadow-2xl ring-2 ring-black border-black z-50' : 'hover:border-gray-300'
          }`}
        >
          {/* Drag Handle: На мобільних зробив зону більшою для пальців */}
          <div {...provided.dragHandleProps} className="text-gray-300 cursor-grab hover:text-black p-1">
            <GripVertical size={20} />
          </div>

          {/* Фото */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {item.image ? (
              <img src={item.image} alt={t(item.name)} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            ) : (
              <ImageIcon className="text-gray-200" size={24} />
            )}
          </div>

          {/* Назва та Вага */}
          <div className="flex-1 min-w-0 py-1">
            <h3 className="font-black uppercase italic tracking-tighter text-sm md:text-base text-gray-900 leading-[1.1] mb-0.5 line-clamp-2">
              {t(item.name)}
            </h3>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {item.weight}
            </p>
          </div>

          {/* Ціна: Ховаємо на дуже малих екранах або робимо компактною */}
          <div className="text-right shrink-0">
            <span className="font-black text-sm md:text-lg">{currentPrice}</span>
            <span className="text-[10px] font-bold text-gray-400 ml-1">{currencySymbol}</span>
          </div>

          {/* Кнопки Дій: Більші відступи для мобільних */}
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => setSelectedItem(item)} className="text-gray-400 hover:text-black p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Pencil size={18} />
            </button>
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};