import { SearchIcon } from "./SearchIcon";
import { SearchInput } from "./SearchInput";
import { ReactElement, ReactNode, useState } from "react";
import { OrderInput } from "../OrderInput";

interface Props {
  order?: () => any;
  search: (textInput: string) => any;
  filter?: () => any;
  children: ReactElement[] | ReactNode[];
}
export const SearchBar = ({ order, search, filter, children }: Props) => {
  const [openedSearch, setOpenedSearch] = useState(false);
  const [openedOrder, setOpenedOrder] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);
  const [textInput, setTextInput] = useState("");

  function change(bar: string) {
    if (bar == "search") {
      setOpenedSearch(!openedSearch);
      setTextInput("");
      search("");
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
    <div className="justify-end w-[45rem] relative mb-3 flex gap-2 ">
      {search && openedSearch && (
        <SearchInput
          action={() => {
            // console.log(textInput);
            search(textInput);
          }}
          setTextField={(newText: string) => setTextInput(newText)}
        />
      )}

      {order && openedOrder && children[0]}
      {filter && openedFilter && children[1]}
      {search && (
        <SearchIcon
          iconSrc={"/searchIcons/search.svg"}
          action={() => {
            // console.log(textInput);
            search(textInput);
          }}
          open={() => change("search")}
        />
      )}
      {order && (
        <SearchIcon
          iconSrc={"/searchIcons/order.svg"}
          open={() => change("order")}
          action={() => order()}
        />
      )}
      {filter && (
        <SearchIcon
          iconSrc={"/searchIcons/filter.svg"}
          action={() => filter()}
          open={() => change("filter")}
        />
      )}
    </div>
  );
};
