export class DestinationId {
    constructor(
        public userId: number,
        public messageId: number
    ) {}

    equals(obj: any): boolean {
        if (obj instanceof DestinationId) {
            const other = obj as DestinationId;
            return this.userId === other.userId && this.messageId === other.messageId;
        }
        return false;
    }
}
