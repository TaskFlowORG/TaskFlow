import { TypeOfPage } from "@/models";
import { useTheme } from "next-themes";

export const PageTypeIcons = ({type}:{type:TypeOfPage}) => {

    const {theme} = useTheme()

    const color = theme === "dark" ? "var(--secondary-color)" : "var(--primary-color)"

    switch (type) {
        case TypeOfPage.CALENDAR:
            return (
                    <svg width="100%" height="100%" viewBox="0 0 110 110" fill="currentColor" className="stroke-none text-input-grey dark:text-back-grey" xmlns="http://www.w3.org/2000/svg">
                        <rect width="110" height="110" rx="5" />
                        <rect x="18" y="25.5" width="74" height="15" rx="2" fill={color} />
                        <rect x="24" y="20" width="6" height="14" rx="2" fill={color} />
                        <rect x="81" y="20" width="6" height="14" rx="2" fill={color} />
                        <rect x="18" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="29" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="40" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="51" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="62" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="73" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="84" y="42" width="8" height="8" rx="1" fill={color} />
                        <rect x="18" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="29" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="40" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="51" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="62" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="73" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="84" y="52" width="8" height="8" rx="1" fill={color} />
                        <rect x="18" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="29" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="40" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="51" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="62" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="73" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="84" y="62" width="8" height="8" rx="1" fill={color} />
                        <rect x="18" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="29" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="40" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="51" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="62" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="73" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="84" y="72" width="8" height="8" rx="1" fill={color} />
                        <rect x="18" y="82" width="8" height="8" rx="1" fill={color} />
                        <rect x="29" y="82" width="8" height="8" rx="1" fill={color} />
                        <rect x="40" y="82" width="8" height="8" rx="1" fill={color} />
                        <rect x="51" y="82" width="8" height="8" rx="1" fill={color} />
                        <rect x="62" y="82" width="8" height="8" rx="1" fill={color} />
                        <rect x="73" y="82" width="8" height="8" rx="1" fill={color} />
                        <rect x="84" y="82" width="8" height="8" rx="1" fill={color} />
                    </svg>
            )
        case TypeOfPage.CANVAS:
            return (
                    <svg width="100%" height="100%" viewBox="0 0 110 110" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="stroke-none text-input-grey dark:text-back-grey">
                        <rect width="110" height="110" rx="5"/>
                        <path d="M93.3462 31.4227C93.5082 30.5486 92.9257 29.6354 92.0827 29.4417L86.9174 28.111C86.0827 27.8725 85.2303 28.4161 85.0684 29.2903L84.2954 
                        33.4003L92.5732 35.5328M79.343 60.1922C79.297 60.4411 79.3471 60.6982 79.4833 60.9116L82.094 65.0052C82.391 65.4708 83.0092 65.6075 83.4749 
                        65.3106L87.1827 62.9458C87.4165 62.7967 87.5779 62.5571 87.6283 62.2844L92.133 37.9086L83.8552 35.7761L79.343 60.1922Z" fill={color}/>
                        <path d="M81.702 71.0216C81.6288 73.1166 80.9159 75.2439 80.1917 77.2021C78.5655 81.599 75.5616 84.9225 70.5577 86.1492C62.3721 88.1559 53.5048 
                        83.9185 51.2629 76.1808C50.2721 72.7613 50.0923 69.291 50.5926 65.7957C51.2482 61.2148 52.3512 56.6719 51.6616 52.0141C51.064 47.9772 48.9109 
                        44.0554 46.6986 40.5943C44.042 36.4382 40.5815 33.2112 35.4492 31.9646C31.171 30.9255 27.0489 31.3277 23.4634 33.8234C19.3711 36.6719 17.7701 
                        41.6094 17.8838 46.2678C17.966 49.6309 19.2044 53.0001 22.0199 55.2081C26.0431 58.3634 32.2303 58.281 37.0233 57.2578C43.3372 55.9099 47.6684 
                        50.9535 51.1375 46.159C55.2273 40.5068 57.9794 34.1884 61.0167 28.018C61.9671 26.0873 63.1719 24.237 63.2482 22.0559" 
                        stroke={color} strokeWidth="5" strokeLinecap="round"/>
                    </svg>)
        case TypeOfPage.KANBAN:
            return (
                    <svg width="100%" height="100%" viewBox="0 0 110 110" fill="currentColor" className="stroke-none text-input-grey dark:text-back-grey" xmlns="http://www.w3.org/2000/svg">
                        <rect width="110" height="110" rx="5"/>
                        <rect x="15" y="20" width="25" height="49" rx="2" fill={color}/>
                        <rect x="42.5" y="20" width="25" height="70" rx="2" fill={color}/>
                        <rect x="70" y="20" width="25" height="38" rx="2" fill={color}/>
                        <rect x="17.5" y="22" width="20" height="13" rx="1" />
                        <rect x="17.5" y="36" width="20" height="10" rx="1" />
                        <rect x="17.5" y="47" width="20" height="10" rx="1" />
                        <rect x="44.7" y="22" width="20" height="18" rx="1" />
                        <rect x="44.7" y="46" width="20" height="9" rx="1" />
                        <rect x="44.7" y="41" width="20" height="7" rx="1" />
                        <rect x="44.7" y="56" width="20" height="13" rx="2" />
                        <rect x="72.5" y="22" width="20" height="9" rx="1" />
                        <rect x="72.5" y="32" width="20" height="21" rx="1" />
                    </svg>

            )
        case TypeOfPage.LIST:
            return (
                    <svg width="100%" height="100%" viewBox="0 0 110 110" fill="currentColor" className="stroke-none text-input-grey dark:text-back-grey"  xmlns="http://www.w3.org/2000/svg">
                        <rect width="110" height="110" rx="5"/>
                        <rect x="16" y="20.5" width="34" height="12" rx="1" fill={color} />
                        <rect x="16" y="36" width="34" height="7" rx="1" fill={color} />
                        <rect x="16" y="46" width="34" height="7" rx="1" fill={color} />
                        <rect x="16" y="56" width="34" height="7" rx="1" fill={color} />
                        <rect x="16" y="66" width="34" height="7" rx="1" fill={color} />
                        <rect x="16" y="76" width="34" height="7" rx="1" fill={color} />
                        <rect x="16" y="86" width="34" height="7" rx="1" fill={color} />
                        <rect x="60" y="20.5" width="34" height="12" rx="1" fill={color} />
                        <rect x="60" y="36" width="34" height="7" rx="1" fill={color} />
                        <rect x="60" y="46" width="34" height="7" rx="1" fill={color} />
                        <rect x="60" y="56" width="34" height="7" rx="1" fill={color} />
                        <rect x="60" y="66" width="34" height="7" rx="1" fill={color} />
                        <rect x="60" y="76" width="34" height="7" rx="1" fill={color} />
                        <rect x="60" y="86" width="34" height="7" rx="1" fill={color} />
                    </svg>)
        case TypeOfPage.TABLE:
            return (
                <svg width="100%" height="100%" viewBox="0 0 110 110" fill="currentColor" className="stroke-none text-input-grey dark:text-back-grey" xmlns="http://www.w3.org/2000/svg">
                    <rect width="110" height="110" rx="5"/>
                    <rect x="18" y="20" width="74" height="12" rx="2" fill={color}/>
                    <rect x="18" y="36" width="22" height="7" rx="1" fill={color}/>
                    <rect x="18" y="46" width="22" height="7" rx="1" fill={color}/>
                    <rect x="18" y="56" width="22" height="7" rx="1" fill={color}/>
                    <rect x="18" y="66" width="22" height="7" rx="1" fill={color}/>
                    <rect x="18" y="76" width="22" height="7" rx="1" fill={color}/>
                    <rect x="18" y="86" width="22" height="7" rx="1" fill={color}/>
                    <rect x="44" y="36" width="22" height="7" rx="1" fill={color}/>
                    <rect x="44" y="46" width="22" height="7" rx="1" fill={color}/>
                    <rect x="44" y="56" width="22" height="7" rx="1" fill={color}/>
                    <rect x="44" y="66" width="22" height="7" rx="1" fill={color}/>
                    <rect x="44" y="76" width="22" height="7" rx="1" fill={color}/>
                    <rect x="44" y="86" width="22" height="7" rx="1" fill={color}/>
                    <rect x="70" y="36" width="22" height="7" rx="1" fill={color}/>
                    <rect x="70" y="46" width="22" height="7" rx="1" fill={color}/>
                    <rect x="70" y="56" width="22" height="7" rx="1" fill={color}/>
                    <rect x="70" y="66" width="22" height="7" rx="1" fill={color}/>
                    <rect x="70" y="76" width="22" height="7" rx="1" fill={color}/>
                    <rect x="70" y="86" width="22" height="7" rx="1" fill={color}/>
                </svg>
            )
            
        case TypeOfPage.TIMELINE:
            return (
                <svg width="100%" height="100%" viewBox="0 0 110 110" fill="currentColor" className="stroke-none text-input-grey dark:text-back-grey" xmlns="http://www.w3.org/2000/svg">
                    <rect width="110" height="110" rx="5" />
                    <rect x="45.5" y="26" width="51" height="4" rx="2" fill={color}/>
                    <rect x="49.5" y="38" width="47" height="4" rx="2" fill={color}/>
                    <rect x="42.5" y="50" width="54" height="4" rx="2" fill={color}/>
                    <rect x="16.5" y="62" width="80" height="4" rx="2" fill={color}/>
                    <rect x="16.5" y="74" width="80" height="4" rx="2" fill={color}/>
                    <rect x="16.5" y="86" width="80" height="4" rx="2" fill={color}/>
                    <path d="M33 54.2C37.0313 54.2 40.8975 52.5986 43.748 49.748C46.5986 46.8975 48.2 43.0313 48.2 39C48.2 34.9687 46.5986 31.1025 43.748 
                    28.252C40.8975 25.4014 37.0313 23.8 33 23.8C28.9687 23.8 25.1025 25.4014 22.252 28.252C19.4014 31.1025 17.8 34.9687 17.8 39C17.8 43.0313 
                    19.4014 46.8975 22.252 49.748C25.1025 52.5986 28.9687 54.2 33 54.2ZM33 20C35.4951 20 37.9658 20.4914 40.271 21.4463C42.5762 22.4011 44.6707 
                    23.8007 46.435 25.565C48.1993 27.3293 49.5989 29.4238 50.5537 31.729C51.5086 34.0342 52 36.5049 52 39C52 44.0391 49.9982 48.8718 46.435 
                    52.435C42.8718 55.9982 38.0391 58 33 58C22.493 58 14 49.45 14 39C14 33.9609 16.0018 29.1282 19.565 25.565C23.1282 22.0018 27.9609 20 33 
                    20ZM33.95 29.5V39.475L42.5 44.548L41.075 46.885L31.1 40.9V29.5H33.95Z" fill={color}/>
                </svg>  

            )
    }
}