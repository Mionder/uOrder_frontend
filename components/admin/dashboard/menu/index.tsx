'use client'
import { useAuth } from "@/context/AuthContext";
import CreateMenuItemForm from "./add-menu-item-form"
import { deleteMenuItemRequest } from "./delete-menu-item-service"
import { useLanguage } from "@/context/LanguageContext";
import { MenuManager } from "../../menu-manager";
import { useState } from "react";

export const MenuAdmin = ({ categories, menuTree, tenantSlug }: any) => {
    const { t } = useLanguage();
    const { token } = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div className="max-w-3xl mx-auto">
            {
                (token && !showCreateModal) && (
                    <MenuManager initialData={menuTree} token={token} setShowCreateModal={setShowCreateModal} slug={tenantSlug} />
                )
            }

            {
                showCreateModal && (
                    <CreateMenuItemForm categories={categories} setShowCreateModal={setShowCreateModal} slug={tenantSlug} />
                )
            }
        </div>
    )
}