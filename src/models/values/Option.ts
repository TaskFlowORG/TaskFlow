 


export class Option {
    constructor( public name: string, public color: string,public id?: number) {}

    equals(obj: any): boolean {
        if (obj instanceof Option) {
            return this.id === obj.id;
        }
        return false;
    }
}
