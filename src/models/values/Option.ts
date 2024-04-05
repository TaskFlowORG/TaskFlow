 


export class Option {
    constructor(public id: number, public name: string, public color: string) {}

    equals(obj: any): boolean {
        if (obj instanceof Option) {
            return this.id === obj.id;
        }
        return false;
    }
}
