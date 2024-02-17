import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class DestinationId {
    userUsername!: string;
    messageId!: number;

    constructor(userUsername: string, messageId: number) {}

    equals(obj: any): boolean {
        if (obj instanceof DestinationId) {
            const other = obj as DestinationId;
            return this.userUsername === other.userUsername && this.messageId === other.messageId;
        }
        return false;
    }
}
