
export class Archive {

    constructor(
        public id: number,
        public type: string,
        public name: string,
        public data:Uint8Array
    ){}

    equals(obj: any): boolean {
        if (obj instanceof Archive) {
            return obj.constructor === this.constructor && obj.id === this.id;
        }
        return false;
    }
}
