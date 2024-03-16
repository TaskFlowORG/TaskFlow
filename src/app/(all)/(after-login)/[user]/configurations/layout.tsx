import { SideBarConfig } from "@/components/SideBarConfig";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <>

            <div className="flex w-full h-full">
                    <SideBarConfig></SideBarConfig>
                    {children}
            </div>

        </>

    )
}
