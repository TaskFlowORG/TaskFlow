import { SearchIcon } from "./SearchIcon"

interface Props {
  order?: () => any
  search?: () => any
  filter?: () => any
}
export const SearchBar = ({ order, search, filter }: Props) => {
  return (
    <div className="justify-end w-[45rem] mb-3 flex gap-2">
      {search && <SearchIcon iconSrc={"searchIcons/search.svg"} action={() => search()} />}
      {order && <SearchIcon iconSrc={"searchIcons/order.svg"} action={() => order()} />}
      {filter && <SearchIcon iconSrc={"searchIcons/filter.svg"} action={() => filter()} />}
    </div>
  )
}   