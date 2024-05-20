import { useEffect, useState } from "react"
import { GroupAccess } from "../GroupAccess/GroupAccess";
import { OtherUser, Project } from "@/models";
import { groupService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";


interface Props {
    user: OtherUser;
    project?: Project;
    groupId?: number;
}


export const Description = ({ user, project, groupId } : Props) => {


    return (
        <div>
                 <GroupAccess  project={project} groupId={groupId ?? 0} user={user}/>
        </div>
    )
}



