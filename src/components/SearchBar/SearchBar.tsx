import { SearchIcon } from "./SearchIcon";
import { SearchInput } from "./SearchInput";
import { useState } from "react";

interface Props {
  order?: () => any;
  search?: () => any;
  filter?: () => any;
}
export const SearchBar = ({ order, search, filter }: Props) => {
  const [openedSearch, setOpenedSearch] = useState(false);
  const [openedOrder, setOpenedOrder] = useState(true);
  const [openedFilter, setOpenedFilter] = useState(true);

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
    <div className="justify-end w-[45rem] mb-3 flex gap-2 ">
      {search && openedSearch && <SearchInput />}
      {search && (
        <SearchIcon
          iconSrc={"searchIcons/search.svg"}
          action={() => search()}
          open={() => change("search")}
        />
      )}
      {order && (
        <SearchIcon
          iconSrc={"searchIcons/order.svg"}
          open={() => change("order")}
          action={() => order()}
        />
      )}
      {filter && (
        <SearchIcon
          iconSrc={"searchIcons/filter.svg"}
          action={() => filter()}
          open={() => change("filter")}
        />
      )}
    </div>
  );
};
