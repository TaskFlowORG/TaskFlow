import { OtherUser, Project, ProjectPost, ProjectPut, ProjectSimple, User } from "@/models";
import { Api } from "../axios";
import { Notification } from "@/models/Notification";

class NotificationService {
    
    async clickNotification(id: number): Promise<Notification> {
       return  (await Api.patch<Notification>(`notification/click/${id}`, {withCredentials: true})).data;
    }
    async visualizeNotifications(): Promise<Notification[]> {
        const response = await Api.patch<Notification[]>("notification/visualize", {withCredentials: true});
        return response.data;
    }

    async deleteNotification(id: number): Promise<void> {
        await Api.delete<void>(`notification/${id}`, {withCredentials: true});
    }


}

export const notificationService= new NotificationService();
