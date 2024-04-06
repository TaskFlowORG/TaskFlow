import { TypeOfNotification } from "@/models/enums/TypeOfNotification";

export const NotificationTitle = ({type}:{type:TypeOfNotification}) => {
    switch (type) {
        case TypeOfNotification.CHANGETASK:
            return <h5>Task</h5>;
        case TypeOfNotification.ADDORREMOVEINGROUP:
            return <h5>Group</h5>;
        case TypeOfNotification.CHANGEPERMISSION:
            return <h5>Permission</h5>;
        case TypeOfNotification.POINTS:
            return <h5>Congratulations!!</h5>;
        case TypeOfNotification.SCHEDULE:
            return <h5>Schedule</h5>;
        case TypeOfNotification.DEADLINE:
            return <h5>Deadline</h5>;
        case TypeOfNotification.CHAT:
            return <h5>Chat</h5>;
        case TypeOfNotification.COMMENT:
            return <h5>Comments</h5>;
    }
}