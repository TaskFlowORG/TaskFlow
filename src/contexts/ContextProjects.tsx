    "use client"
    import { Project, ProjectSimple } from "@/models";
    import { createContext, useCallback, useContext, useState } from "react";

    type ProjectsContext = {
        projects?: ProjectSimple[];
        setProjects?: (projects: ProjectSimple[]) => void;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    export const ProjectsContext = createContext<ProjectsContext>({});

