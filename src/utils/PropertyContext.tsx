"use client"
import { Project } from "@/models";
import { createContext, useCallback, useContext, useState } from "react";

type PropertyContextType = {
    propertyId?:number,
    setPropertyId?:(number:number)=>void,
    setSide?:(bool:boolean)=>void
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const PropertyContext = createContext<PropertyContextType>({});