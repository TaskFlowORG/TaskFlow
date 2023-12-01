import { Group } from "../Group";
import { Permission } from "../Permission";
import { User } from "../User";

export class UserGroup{
    userId: Number;
    groupId: Number;
    user: User;
    group: Group;
    permission: Permission;

    constructor(userId: Number, groupId: Number, user: User, group: Group, permission: Permission) {
        this.userId = userId;
        this.groupId = groupId;
        this.user = user;
        this.group = group;
        this.permission = permission;
    }
}