import { Chat, ChatGroup, ChatGroupPost, ChatPrivate, ChatPrivatePost, Message } from '@/models';
import { Api } from '@/services/axios';

class ChatService {
    async saveGroup(chat: ChatGroupPost): Promise<ChatGroup> {
        const response = await Api.post<ChatGroup>('chat/group/'+chat.group.id, chat, {withCredentials: true});
        return response.data;
    }

    async savePrivate(chat: ChatPrivatePost, userId: number): Promise<ChatPrivate> {
        const response = await Api.post<ChatPrivate>('chat/private/'+userId, chat, {withCredentials: true});
        return response.data;
    }

    async upDateToVisualized(chatId: number): Promise<Chat> {
        const response = await Api.patch<Chat>(`chat/visualized/${chatId}`, {withCredentials: true});
        return response.data;
    }

    async findAllPrivate(): Promise<ChatPrivate[]> {
        const response = await Api.get<ChatPrivate[]>('chat/private', {withCredentials: true});
        return response.data;
    }

    async findAllGroup(): Promise<ChatGroup[]> {
        const response = await Api.get<ChatGroup[]>('chat/group', {withCredentials: true});
        return response.data;
    }

    async updateMessages(
        message: Message,
        chatId: number,
        annex?: File,
    ): Promise<Message> {
        const formData = new FormData();
        if (annex) {
            formData.append('annex', annex);
        }
        formData.append('message', JSON.stringify(message));
        const response = await Api.patch<Message>(`chat/${chatId}`, formData, {withCredentials: true});
        return response.data;
    }
}

export const chatService = new ChatService();
