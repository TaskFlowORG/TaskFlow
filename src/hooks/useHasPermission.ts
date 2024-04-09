import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { Permission, Project, TypePermission } from "@/models";
import { useContext, useEffect, useState } from "react";
import { set } from "zod";

export const 


useHasPermission = (action: 'read' | 'create' | 'delete' | 'update'): boolean => {
    const { user } = useContext(UserContext);
    const { project } = useContext(ProjectContext);
    const [sucess, setSucess] = useState<boolean>(false);
    useEffect(() => {
        
        if (!user){
            setSucess(false);
            return;
        }
        if (!project){
            setSucess(true);
            return;
        }
        const permission = user.permissions.find((p) => p.project.id === project.id);
        if (!permission){
            setSucess(false);
            return;
        }
        switch (permission.permission) {
            case TypePermission.READ:
                setSucess(action == 'read')
            case TypePermission.CREATE:
                setSucess(action == 'read' || action == 'create')
            case TypePermission.DELETE:
                setSucess(action == 'read' || action == 'delete')
            case TypePermission.UPDATE:
                setSucess(action == 'read' || action == 'update')
            case TypePermission.DELETE_CREATE:
                setSucess(action == 'read' || action == 'delete' || action == 'create')
            case TypePermission.UPDATE_CREATE:
                setSucess(action == 'read' || action == 'update' || action == 'create')
            case TypePermission.UPDATE_DELETE:
                setSucess(action == 'read' || action == 'update' || action == 'delete')
            case TypePermission.UPDATE_DELETE_CREATE:
                setSucess(action == 'read' || action == 'update' || action == 'delete' || action == 'create')
        }
    }, [user, project]);
    return sucess;

}