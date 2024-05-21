import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { Group, OtherUser, Permission, Project, TypePermission } from "@/models";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { groupService, userService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { set } from "zod";

export const
    useHasPermission = (action: 'read' | 'create' | 'delete' | 'update'): boolean => {
        const { user } = useContext(UserContext);
        const { project } = useContext(ProjectContext);
        const [sucess, setSucess] = useState<boolean>(false);
        const [groups,  setGroups] = useState<SimpleGroup[]>([]);
        const [owners, setOwners] = useState<OtherUser[]>([]);

        useEffect(() => {
            (async () => {
                if (!project) return;
                const groupsPromise = await groupService.findGroupsByAProject(project.id);
                setGroups(groupsPromise);
                let ownersPromise = [];
                for (let group of groupsPromise) {
                    const owner = await userService.findByUsername(group.ownerUsername);
                    ownersPromise.push(owner);
                }
                setOwners(ownersPromise);
                
            })()
        }, [project]);

        useEffect(() => {
                if (!user) {
                    setSucess(false);
                } else if (!project) {
                    setSucess(true);
                } else if (project.owner.id === user.id) {
                    console.log('owner1');
                    setSucess(true);
                } else if (owners.find( (o) => o?.id == user.id)){
                    setSucess(true);
                }
                else {
                    const permission = user.permissions.find((p) => p.project.id === project.id);
                    console.log(permission);
                    if (!permission) {
                        setSucess(false);
                        return;
                    } else {
                        console.log(permission.permission.includes(action.toUpperCase()));
                        setSucess(permission.permission.includes(action.toUpperCase()));

                    }
    
                }
            return () => {
                setSucess(false);
            }
        }, [user, project, groups]);
        return sucess;

    }