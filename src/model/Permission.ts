import { PermissionEnum } from "./enums/PermissionEnum";
import { Project } from "./Project";
export class Permission {
     id : number;
      name :string;
     permission : PermissionEnum;
     project:Project;

     constructor(id:number,name:string,permission:PermissionEnum, project:Project){
           this.id=id;
           this.name=name;
           this.permission=permission;
           this.project = project
      }
}