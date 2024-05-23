import { Code } from "@/models/Code";
import { Api } from "../axios";

class EmailService {
    async sendEmailForgotPassword(username: string): Promise<void> {
        await Api.post<void>('/sendEmail/forgotPassword', { username }, { withCredentials: true });
    }

    async sendEmailAuth(username: string): Promise<void> {
        await Api.post<void>('/sendEmail/auth', { username }, { withCredentials: true });
    }

    async getCode() : Promise<Code[]>{
       const response =  await Api.get<Code[]>('/sendEmail/code', { withCredentials: true })
        return response.data;
    }
  }
  
  export const emailService = new EmailService();