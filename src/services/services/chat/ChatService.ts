import { Chat, ChatGroup, ChatGroupPost, ChatPrivate, ChatPrivatePost, Message } from '@/models';
import { Api } from '@/services/axios';

class ChatService {
    async saveGroup(chat: ChatGroupPost): Promise<ChatGroup> {
        const response = await Api.post<ChatGroup>('chat/group', chat);
        return response.data;
    }

    async savePrivate(chat: ChatPrivatePost): Promise<ChatPrivate> {
        const response = await Api.post<ChatPrivate>('chat/private', chat);
        return response.data;
    }

    async upDateToVisualized(chatId: number): Promise<Chat> {
        const response = await Api.patch<Chat>(`chat/visualized/${chatId}`);
        return response.data;
    }

    async findAllPrivate(): Promise<ChatPrivate[]> {
        const response = await Api.get<ChatPrivate[]>('chat/private');
        return response.data;
    }

    async findAllGroup(): Promise<ChatGroup[]> {
        const response = await Api.get<ChatGroup[]>('chat/group');
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
        const response = await Api.patch<Message>(`chat/${chatId}`, formData);
        return response.data;
    }
}

export const chatService = new ChatService();
