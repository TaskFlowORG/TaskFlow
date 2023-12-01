import { Message } from "./Message";
import { TypeOfChat } from "../enums/TypeOfChat";
export  class Chat {

     id: Number;
     users : Array<User>;
     messages : Array<Message>;
     type : TypeOfChat;
     name: String;
     picture : String;
     quantitityUnvisualized : Number;
     lastMessage : Message;

    constructor(id: Number, users: Array<User>, messages: Array<Message>, type: TypeOfChat, name: String, picture: String, quantitityUnvisualized: Number, lastMessage: Message) {
        this.id = id;
        this.users = users;
        this.messages = messages;
        this.type = type;
        this.name = name;
        this.picture = picture;
        this.quantitityUnvisualized = quantitityUnvisualized;
        this.lastMessage = lastMessage;
    }
}


