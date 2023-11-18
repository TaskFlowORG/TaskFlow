import { GeneralConfig } from "@/components/GeneralConfig"
import { SideBarConfig } from "@/components/SideBarConfig"

export default function UserConfigPage({params}) {
    params.user;
    return (

        <div className="flex">
            <SideBarConfig></SideBarConfig>
            <GeneralConfig></GeneralConfig>
        </div>
    )
}