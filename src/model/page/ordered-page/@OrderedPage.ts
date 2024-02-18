// import { AllArgsConstructor } from "@/utils";
// import { Page } from "../page/Page";
// import { Project } from "next/dist/build/swc";
// import { TypeOfPage } from "@/model/enums/TypeOfPage";
// import { Property } from "@/model/property/property/Property";
// import { ProjectGet } from "@/model/project/project/ProjectGetDTO";
// import { TaskPageGet } from "@/model/relations/task-page/TaskPageGetDTO";


// @AllArgsConstructor
// export class OrderedPage extends Page {
//     propertyOrdering?: Property;

//     constructor(id: number, name: string, type: TypeOfPage, properties: Property[], 
//         project: ProjectGet, tasks: TaskPageGet[], propertyOrdering: Property) {
//         super(id, name, type, properties, project, tasks);
//     }
//     equals(obj: any): boolean {
//         if (obj instanceof OrderedPage) {
//             return obj.id === this.id;
//         }
//         return false;
//     }
// }
