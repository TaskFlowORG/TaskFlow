import { UserConfig } from "@/components/UserConfig"
import { SideBarConfig } from "@/components/SideBarConfig"
export default function UserConfigPage() {
    return (

        <div className="flex">
            <SideBarConfig></SideBarConfig>
            <UserConfig></UserConfig>
        </div>
    )
}