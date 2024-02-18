// import { AllArgsConstructor } from "@/utils";
// import { Message } from "react-hook-form";
// import { Chat } from "../chat/Chat";
// import { UserGet } from "@/model/user/user/UserGetDTO";
// import { TypeOfChat } from "@/model/enums/TypeOfChat";

// @AllArgsConstructor
// export class ChatPrivate extends Chat {
//     users!: UserGet[]; // Adicionado o operador "!"

//     constructor(id: number, messages: Message[], type: TypeOfChat, lastMessage: Message, users: UserGet[]) {
//         super(id, messages, type, lastMessage);
//     }

//     equals(obj: any): boolean {
//         if (obj instanceof ChatPrivate) {
//             return obj.id === this.id;
//         }
//         return false;
//     }
// }