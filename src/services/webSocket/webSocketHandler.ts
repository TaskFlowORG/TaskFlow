import { Stomp, Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";





export const onConnect = (topic: string, handle:(message:IMessage) => void) => {
    const socket = new SockJS('http://localhost:9999/notifications');
const client = Stomp.over(socket);
    client.connect({}, () => {
        console.log("connected");
        client.subscribe(topic, (message) => {
            handle(message);
        });
    }); 
}