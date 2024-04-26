import { Code } from "@/models/Code";
import { Api } from "../axios";

class EmailService {
    async sendEmail(username: string): Promise<void> {
        await Api.post<void>('/forgotPassword', { username }, { withCredentials: true });
    }

    async getCode() : Promise<Code[]>{
       const response =  await Api.get<Code[]>('/forgotPassword/code', { withCredentials: true })
        return response.data;
    }
  }
  
  export const emailService = new EmailService();