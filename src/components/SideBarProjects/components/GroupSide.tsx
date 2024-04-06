import { Group, Project } from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect } from "react";
import { getData, getListData } from "@/services/http/api";

interface Props {
    project: Project;
    user: string;
    setModalGroups: (value: boolean) => void;
}

export const GroupSide = ({ project, user, setModalGroups }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedGroups = await getListData("project/" + project.id + "/groups");
                setGroups(fetchedGroups);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
            console.log(groups)
        };

        fetchData();
    }, [project.id]);

    return (
        <span className="flex flex-col max-h-screen gap-14 pt-[4.5rem] h-full p-4 bg-white dark:bg-modal-grey shadow-blur-10 w-96 px-16">
            <Navigate modalPages setCondition={setModalGroups} />
            <ProjectInformations project={project} />
            <div className="flex flex-col w-72 justify-center items-center h-4/6 gap-8">
                <div className="flex items-start h-[95%] w-full overflow-y-auto">
                    <div className="flex flex-col gap-3 items-start max-w-full h-min w-full">
                        {Array.isArray(groups) && groups.map((group) => (
                            <div key={group.id} className="flex flex-row w-full gap-2">
                            <img src="/img/miniGroup.svg" className="h-5 w-5 rounded-md" />
                            <div  className="bg-input-grey dark:bg-back-grey text-start font-alata rounded-md h-7 px-4 py-px w-full hover:brightness-95">{group.name}</div>
                            </div>
                        ))}

                    </div>
                    
                </div>
            </div>
        </span>
    );
};
