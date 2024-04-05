"use client"

import { createContext} from "react";

type ConfigContext = {
    title?: string;
    setTitle?: (value: string) => void;
}
export const ConfigContext = createContext<ConfigContext>({});

