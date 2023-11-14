import { SearchIcon } from "./SearchIcon"

export const SearchBar = ({ hasOrder, hasSearch, hasFilter }) => {
   return(
     <div className="justify-end w-[45rem] mb-3 w-full flex gap-2">
        {hasSearch && <SearchIcon iconSrc={"search.svg"} />}
        {hasOrder && <SearchIcon iconSrc={"order.svg"} />}
        {hasFilter && <SearchIcon iconSrc={"filter.svg"} />}
    </div>
    )
}   