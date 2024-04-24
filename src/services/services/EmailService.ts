import { Api } from "../axios";

class EmailService {

    async insert(email: string): Promise<> {
        const response = await Api.post()
        return response.data;
    }

}

export const emailService = new EmailService();