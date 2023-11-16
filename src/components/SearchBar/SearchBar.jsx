import { SearchIcon } from "./SearchIcon"

export const SearchBar = ({ hasOrder, hasSearch, hasFilter }) => {
   return(
     <div className="justify-end w-[45rem] mb-3 w-full flex gap-2">
        {hasSearch && <SearchIcon iconSrc={"searchIcons/search.svg"} />}
        {hasOrder && <SearchIcon iconSrc={"searchIcons/order.svg"} />}
        {hasFilter && <SearchIcon iconSrc={"searchIcons/filter.svg"} />}
    </div>
    )
}   