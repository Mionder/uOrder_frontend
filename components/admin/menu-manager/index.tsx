// components/admin/MenuManager.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useLanguage } from '@/context/LanguageContext'; // Твій контекст мов
import { Pencil, Trash2, GripVertical, PlusCircle, LayoutGrid } from 'lucide-react'; // Іконки
import { Category } from '@/types/menu';
import { DraggableMenuItem } from './draggable-menu-item';
import { refreshMenu } from '@/actions';
import { EditMenuItemForm } from '../dashboard/menu/edit-item-form';

// Утиліта для реордерінгу масиву (локально)
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const MenuManager = ({ initialData, token, setShowCreateModal, slug, setTab }: { initialData: Category[], token: string, setShowCreateModal: any, slug: any, setTab: any }) => {
  const { t, tr } = useLanguage();
  const [categories, setCategories] = useState<Category[]>(initialData);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Функція, яка спрацьовує, коли користувач відпускає елемент
const onDragEnd = async (result: DropResult) => {
  const { destination, source, type } = result;

  // 1. Якщо відпустили "в нікуди" або позиція не змінилася — виходимо
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  // Працюємо лише з елементами типу 'DEFAULT' (наші страви)
  if (type === 'DEFAULT') {
    const newCategories = [...categories];

    // Знаходимо індекси категорій
    const sourceColIndex = newCategories.findIndex(c => c.id === source.droppableId);
    const destColIndex = newCategories.findIndex(c => c.id === destination.droppableId);

    const sourceCategory = newCategories[sourceColIndex];
    const destCategory = newCategories[destColIndex];

    // Списки страв
    const sourceItems = [...sourceCategory.items];
    const destItems = source.droppableId === destination.droppableId 
      ? sourceItems 
      : [...destCategory.items];

    // 2. Видаляємо страву з масиву-джерела
    const [movedItem] = sourceItems.splice(source.index, 1);

    // 3. Змінюємо categoryId для страви (на випадок переміщення між категоріями)
    const updatedItem = { ...movedItem, categoryId: destination.droppableId };

    // 4. Вставляємо в новий масив-призначення
    destItems.splice(destination.index, 0, updatedItem);

    // Оновлюємо локальний стейт
    newCategories[sourceColIndex] = { ...sourceCategory, items: sourceItems };
    if (source.droppableId !== destination.droppableId) {
      newCategories[destColIndex] = { ...destCategory, items: destItems };
    }
    setCategories(newCategories);

    // --- ПІДГОТОВКА ДАНИХ ДЛЯ БЕКЕНДУ ---
    
    // Нам потрібно оновити sortOrder для ВСІХ страв, які були зачеплені.
    // Якщо категорія одна — тільки її items. Якщо дві — обох.
    let itemsToUpdate: any[] = [];

    // Функція-хелпер для формування масиву оновлень
    const mapItems = (items: any[], catId: string) => 
      items.map((item, index) => ({
        id: item.id,
        sortOrder: index,
        categoryId: catId
      }));

    if (source.droppableId === destination.droppableId) {
      // Випадок в межах однієї категорії
      itemsToUpdate = mapItems(destItems, destination.droppableId);
    } else {
      // Випадок переміщення між категоріями — оновлюємо обидві
      itemsToUpdate = [
        ...mapItems(sourceItems, source.droppableId),
        ...mapItems(destItems, destination.droppableId)
      ];
    }

    // 5. Відправка на бекенд (PATCH /v1/admin/menu/reorder)
    try {
      const response = await fetch('http://localhost:3000/v1/admin/menu/reorder', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: itemsToUpdate }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reorder on server');
      }
      
      console.log('Successfully reordered items');
      await refreshMenu(slug);
    } catch (err) {
      console.error("Помилка синхронізації:", err);
      // Опційно: тут можна відкотити стейт до initialData, якщо запит провалився
      // setCategories(initialData); 
    }
  }
};

const onSave = async (id: string, data: any) => {
    try {
        const response = await fetch(`http://localhost:3000/v1/admin/menu/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Edited successfully');

        console.log('response_data', response);
        await refreshMenu(slug);
      };
    } catch (err) {
        console.error(err);
    }
}

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">{tr('menu_page.title')}</h1>
            <p className="text-gray-400 text-sm font-medium mt-1">{tr('menu_page.subtitle')}</p>
          </div>
          {
            categories.length > 0 && (
            <button 
              onClick={() => setShowCreateModal(true)} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition shadow-lg active:scale-95"
            >
              <PlusCircle size={20} />
              <span className="text-xs font-black uppercase tracking-widest">{tr('menu_page.add_btn')}</span>
            </button>
            )
          }
          
        </div>
        {
          categories.length === 0 && (
            <div>
              <p className="text-gray-600 font-medium mb-4">{tr('empty_categories')}</p>
              <button onClick={() => setTab(1)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition shadow-lg active:scale-95">
                <span className="text-xs font-black uppercase tracking-widest">
                {tr('go_to_categories')}
                </span>
                </button>
            </div>
          )
        }

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white p-5 md:p-7 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <LayoutGrid size={20} />
                    </div>
                    <h2 className="text-xl font-black uppercase italic tracking-tight">{t(category.name)}</h2>
                  </div>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50"><Pencil size={18} /></button>
                    <button className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"><Trash2 size={18} /></button>
                  </div>
                </div>

                <Droppable droppableId={category.id} type="DEFAULT">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-3 min-h-[60px] rounded-2xl transition-all ${snapshot.isDraggingOver ? 'bg-gray-50 ring-2 ring-blue-100 ring-dashed' : ''}`}
                    >
                      {category.items.map((item, index) => (
                        <DraggableMenuItem key={item.id} item={item} index={index} token={token} slug={slug} setSelectedItem={setSelectedItem} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Форма редагування: Виїжджає збоку */}
      {selectedItem && (
        <div className="fixed inset-0 z-[1000] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full sm:w-[450px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <EditMenuItemForm 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
              categories={categories}
              onSave={onSave}
              slug={slug}
            />
          </div>
        </div>
      )}
    </div>
  );
};