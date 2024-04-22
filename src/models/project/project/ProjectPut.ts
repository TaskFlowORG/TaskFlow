
import { Message } from "@/models";
import { PropertyValue } from "@/models/relations/property-value/PropertyValue";
 

export class ProjectPut {
    constructor(
        public id: number,
        public name: string |undefined,
        public description: string|undefined,
        public comments: Message[],
        public values: PropertyValue[]
    ) {}
    
    equals = (obj: any) => {
        return obj instanceof ProjectPut && obj.id === this.id;
    }
}