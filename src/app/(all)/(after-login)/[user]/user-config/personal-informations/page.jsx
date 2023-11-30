import { PersonalInformations } from "@/components/PersonalInformations"
import { SideBarConfig } from "@/components/SideBarConfig"
export default function UserConfigPage() {
    return (

        <div className="flex">
            <SideBarConfig></SideBarConfig>
            <PersonalInformations></PersonalInformations>
        </div>
    )
}