// import { AllArgsConstructor } from "@/utils";
// import { Page } from "../page/Page";
// import { Archive } from "@/model/others/Archive";
// import { TypeOfPage } from "@/model/enums/TypeOfPage";
// import { Property } from "@/model/property/property/Property";
// import { ProjectGet } from "@/model/project/project/ProjectGetDTO";
// import { TaskPageGet } from "@/model/relations/task-page/TaskPageGetDTO";

// @AllArgsConstructor
// export class CanvasPage extends Page {
//     draw!: Archive;

//     constructor(id: number, name: string, type: TypeOfPage, properties: Property[], 
//         project: ProjectGet, tasks: TaskPageGet[], draw: Archive) {
//         super(id, name, type, properties, project, tasks);
//     }

//     equals(obj: any): boolean {
//         if (obj instanceof CanvasPage) {
//             return obj.id === this.id;
//         }
//         return false;
//     }
// }
