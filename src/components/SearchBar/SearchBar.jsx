import { SearchIcon } from "./SearchIcon"

export const SearchBar = ({ order, search, filter }) => {
  return (
    <div className="justify-end w-[45rem] mb-3 flex gap-2">
      {search && <SearchIcon iconSrc={"searchIcons/search.svg"} action={() => search()} />}
      {order && <SearchIcon iconSrc={"searchIcons/order.svg"} action={() => order()} />}
      {filter && <SearchIcon iconSrc={"searchIcons/filter.svg"} action={() => filter()} />}
    </div>
  )
}   