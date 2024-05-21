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

        useEffect(() => {
            (async () => {
                if (!project) return;
                const groupsPromise = await groupService.findGroupsByAProject(project.id);
                setGroups(groupsPromise);
            })()
        }, [project]);

        useEffect(() => {
            (async () => {
                if (!user) {
                    setSucess(false);
                } else if (!project) {
                    setSucess(true);
                } else if (project.owner.id === user.id) {
                    setSucess(true);
                } else if (await groups.find(async (group) => (await userService.findByUsername(group.ownerUsername))?.id === user.id)){
                    setSucess(true);
                }
                else {
                    const permission = user.permissions.find((p) => p.project.id === project.id);
                    if (!permission) {
                        setSucess(false);
                        return;
                    } else {
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
                    }
    
                }
            })()
            return () => {
                setSucess(false);
            }
        }, [user, project, groups]);
        return sucess;

    }