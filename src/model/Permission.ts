import { PermissionEnum } from "./enums/PermissionEnum";
import { Project } from "./Project";
export class Permission {
     id : Number;
      name :String;
     permission : PermissionEnum;
     project:Project;

     constructor(id:Number,name:String,permission:PermissionEnum, project:Project){
           this.id=id;
           this.name=name;
           this.permission=permission;
           this.project = project
      }
}