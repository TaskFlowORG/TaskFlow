import { FilteredProperty } from "@/types/FilteredProperty";
import { createContext } from "react";

  type FilterlistContext = {
    filterProp: FilteredProperty[];
    setFilterProp?: (filterProp: FilteredProperty[]) => void;
    list?: FilteredProperty ;
    setList?: (filterProp: FilteredProperty | undefined) => void;
}

 export const FilterContext = createContext<FilterlistContext>({filterProp:[]});

