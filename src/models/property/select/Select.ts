import { Property } from "../property/Property";
import { Option } from "@/models/values/Option";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";

export class Select extends Property {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean,
        public options: Option[],
    ) {
        super(id, name, type, visible, obligatory);
    }

    equals(obj: any): boolean {
        return obj instanceof Select && obj.id === this.id;
    }
}
