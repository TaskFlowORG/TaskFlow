import { FilteredProperty } from "./FilteredProperty";

export type FilterContextType = {
  filterProp?: FilteredProperty[];
  setFilterProp?: (filterProp: FilteredProperty[]) => void;
  list?: FilteredProperty ;
  setList?: (filterProp: FilteredProperty | undefined) => void;
  input?: string;
  setInput?: (value:string) => void;
}