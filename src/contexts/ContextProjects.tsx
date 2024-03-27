    "use client"
    import { Project } from "@/models";
    import { createContext, useCallback, useContext, useState } from "react";

    type ProjectsContext = {
        projects?: Project[];
        setProjects?: (projects: Project[]) => void;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    export const ProjectsContext = createContext<ProjectsContext>({});

