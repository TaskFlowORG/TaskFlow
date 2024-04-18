import { EditIcon, IconCalendar, IconGroups } from "@/components/icons";
import { IconChat } from "@/components/icons/Notifications/IconChat";
import { IconLock } from "@/components/icons/Notifications/IconLock";
import { IconStar } from "@/components/icons/Notifications/IconStar";
import { IconEditColoured } from "@/components/icons/PageOtpions/IconEditCoulored";
import { TypeOfNotification } from "@/models/enums/TypeOfNotification";

export const NotificationIcon = (props: { type: TypeOfNotification }) => {
    switch (props.type) {
        case TypeOfNotification.CHANGETASK:
            return <IconEditColoured />;
        case TypeOfNotification.ADDINGROUP:
            return <IconGroups />;
            case TypeOfNotification.REMOVEINGROUP:
            return <IconGroups />;
        case TypeOfNotification.CHANGEPERMISSION:
            return <IconLock />
        case TypeOfNotification.POINTS:
            return <IconStar />
        case TypeOfNotification.SCHEDULE:
            return <IconCalendar />;
        case TypeOfNotification.DEADLINE :
            return <IconCalendar />;
        case TypeOfNotification.CHAT:
            return <IconChat />
        case TypeOfNotification.COMMENT:
            return <IconChat />
    }
}