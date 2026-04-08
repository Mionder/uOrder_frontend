'use client'
import { MenuItem } from "../menu-item"
import { useLanguage } from "@/context/LanguageContext";

const menuInformation = [
    {
        name: "Салат фучжу",
        description: "Соєвий бамбук, деревні гриби, бланшовані паростки, часник, маринований чилі і ще 10 інгредієнтів.",
        price: "260 ₴",
        likes: 10,
        image: "https://cdn-media.choiceqr.com/prod-eat-chinahikfm/menu/thumbnail_a-d-p.webp",
    },
    {
        name: "Інь-ян",
        description: "Салат з білими та чорними деревними грибами і легким таємничим соусом.",
        price: "220 ₴",
        likes: 5,
        image: "https://cdn-media.choiceqr.com/prod-eat-chinahikfm/menu/thumbnail_Iuyhcab-elCzplG-ZZfequr_l-T-q.jpeg",
    }
]

export const Category = ({ baseSettings, menu, category }: any) => {
    const { t } = useLanguage();
    return (
        <div>
            <h4 style={{
                color: `${baseSettings.mainColor}`
            }} className="font-bold text-xl p-4">{t(category.name)}</h4>

            {
                menu.map((item: any) => {
                    return <MenuItem key={item.id} info={item} baseColor={baseSettings.mainColor} />
                })
            }

        </div>
    )
}