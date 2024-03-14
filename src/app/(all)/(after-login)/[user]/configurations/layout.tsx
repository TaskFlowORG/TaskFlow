import { SideBarConfig } from "@/components/SideBarConfig";

export default function Layout({ children }) {
    return (
        <>

            <div className="flex justify-between  w-full h-full">
                    <SideBarConfig></SideBarConfig>
                    {children}
            </div>

        </>

    )
}
