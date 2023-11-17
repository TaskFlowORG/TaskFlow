import { NotificationsConfig } from "@/components/NotificationsConfig"
import { SideBarConfig } from "@/components/SideBarConfig"
export default function UserConfigPage() {
    return (

        <div className="flex">
            <SideBarConfig></SideBarConfig>
            <NotificationsConfig></NotificationsConfig>
        </div>
    )
}