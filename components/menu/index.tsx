import { Category } from "../category"

export const Menu = ({ menu, category, tenantInfo }: any) => {
    console.log('menu_data', menu);
    return (
        <div className="w-full">
            <Category baseSettings={tenantInfo} menu={menu} category={category} />
        </div>
    )
}