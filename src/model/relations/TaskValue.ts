import { ValueOf } from "next/dist/shared/lib/constants";
import { Page } from "../pages/Page";
import { Property } from "../Properties/Property";
import { Task } from "../tasks/Task";
import { Value } from "../values/Value";

export class TaskValue {
    id:Number;
    property:Property;
    value:Value;
    constructor(id:Number,property:Property, value:Value ){
        this.id = id;
        this.property = property;
        this.value = value;
    }

}