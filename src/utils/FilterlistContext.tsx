import { FilteredProperty } from "@/types/FilteredProperty";
import { createContext } from "react";
import { FilterContextType } from "@/types/FilterContext";


 export const FilterContext = createContext<FilterContextType>({filterProp:[], input:""});

