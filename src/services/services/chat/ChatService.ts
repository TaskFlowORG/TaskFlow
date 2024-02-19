import { Chat, ChatGroup, ChatGroupPost, ChatPrivate, ChatPrivatePost, Message } from '@/models';
import { Api } from '@/services/axios';

class ChatService {
    async saveGroup(chat: ChatGroupPost): Promise<void> {
        await Api.post('chat/group', chat);
    }

    async savePrivate(chat: ChatPrivatePost): Promise<void> {
        await Api.post('chat/private', chat);
    }

    async upDateToVisualized(message: Message, userId: string): Promise<void> {
        await Api.patch(`chat/visualized/${userId}`, message);
    }

    async findByName(name: string, userId: string): Promise<Chat[]> {
        return (await Api.get<Chat[]>(`chat/name/${userId}/${name}`)).data;
    }

    async findAllPrivate(userId: string): Promise<ChatPrivate[]> {
        return (await Api.get<ChatPrivate[]>(`chat/private/${userId}`)).data;
    }

    async findAllGroup(userId: string): Promise<ChatGroup[]> {
        return (await Api.get<ChatGroup[]> (`chat/group/${userId}`)).data;
    }

    async delete(id: number): Promise<void> {
        await Api.delete(`chat/${id}`);
    }

    async updateMessages(message: Message, chatId: number): Promise<void> {
        await Api.patch(`chat/message/${chatId}`, message);
    }

    async updateMessagesWithAnnex(
        annex: File,
        message: string,
        chatId: number
    ): Promise<void> {
        const formData = new FormData();
        formData.append('annex', annex);
        formData.append('message', message);
        await Api.patch(`chat/annex/${chatId}`, formData);
    }
}

export const chatService =  new ChatService();