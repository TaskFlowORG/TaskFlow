import { PermissionEnum } from "./enums/PermissionEnum";
export class Permission {
     id : Number;
      name :String;
    
     permissions : Array<PermissionEnum>;
     constructor(id:Number,name:String,permissions:Array<PermissionEnum>){
           this.id=id;
           this.name=name;
           this.permissions=permissions;
      }
}