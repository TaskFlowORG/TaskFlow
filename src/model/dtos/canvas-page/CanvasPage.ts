import { AllArgsConstructor } from "@/utils";
import { Archive } from "../Archive";
import { Page } from "./Page";
import { TypeOfPage } from "../enums/TypeOfPage";

@AllArgsConstructor
class CanvasPage extends Page {
    draw!: Archive;

    constructor(id: number, name: string, type: TypeOfPage, properties: any[], project: any, tasks: any[], draw: Archive) {
        super(id, name, type, properties, project, tasks);
    }

    equals(obj: any): boolean {
        if (obj instanceof CanvasPage) {
            return obj.id === this.id;
        }
        return false;
    }
}
