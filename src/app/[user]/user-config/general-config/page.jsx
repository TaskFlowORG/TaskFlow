import { GeneralConfig } from "@/components/GeneralConfig"
import { SideBarConfig } from "@/components/SideBarConfig"

export default function UserConfigPage() {
    return (

        <div className="flex">
            <SideBarConfig></SideBarConfig>
            <GeneralConfig></GeneralConfig>
        </div>
    )
}