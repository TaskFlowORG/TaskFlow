    "use client"
    import { Project } from "@/models";
    import { createContext, useCallback, useContext, useState } from "react";

    type ProjectContext = {
        project?: Project;
        setProject?: (project: Project) => void;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    export const ProjectContext = createContext<ProjectContext>({});

