import { SearchIcon } from "./SearchIcon";
import { SearchInput } from "./SearchInput";
import { ReactElement, ReactNode, useState } from "react";
import { OrderInput } from "../OrderInput";

interface Props {
  order?: boolean;
  search?: boolean;
  filter?: boolean;
  children: ReactElement[] | ReactNode[];
}
export const SearchBar = ({ order =  false, search = false, filter = false, children }: Props) => {
  const [openedSearch, setOpenedSearch] = useState(false);
  const [openedOrder, setOpenedOrder] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);

  function change(bar: string) {
    if (bar == "search") {
      setOpenedSearch(!openedSearch);
      setOpenedFilter(false);
      setOpenedOrder(false);
    } else if (bar == "filter") {
      setOpenedSearch(false);
      setOpenedFilter(!openedFilter);
      setOpenedOrder(false);
    } else {
      setOpenedSearch(false);
      setOpenedFilter(false);
      setOpenedOrder(!openedOrder);
    }
  }

  return (
    <div className="justify-end w-3/5 items-center  relative  h-full flex gap-2 ">
      {search && openedSearch && children[0]}
      {order && openedOrder && children[1]}
      {filter && openedFilter && children[2]}
      {search && (
        <SearchIcon
          iconSrc={"/searchIcons/search.svg"}
          open={() => change("search")}
        />
      )}
      {order && (
        <SearchIcon
          iconSrc={"/searchIcons/order.svg"}
          open={() => change("order")}
        />
      )}
      {filter && (
        <SearchIcon
          iconSrc={"/searchIcons/filter.svg"}

          open={() => change("filter")}
        />
      )}
    </div>
  );
};
