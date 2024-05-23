"use client"
import { Project } from "@/models";
import { createContext, useCallback, useContext, useState } from "react";

type PageContext = {
    inPage:boolean
    setInPage?: (boolean: boolean) => void;
    pageId?:number;
    setPageId?:(number:number)=> void
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const PageContext = createContext<PageContext>({inPage: false});