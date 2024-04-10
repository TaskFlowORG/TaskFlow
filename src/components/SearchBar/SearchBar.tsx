import { SearchIcon } from "./SearchIcon";
import { SearchInput } from "./SearchInput";
import { ReactElement, ReactNode, useContext, useState } from "react";
import { OrderInput } from "../OrderInput";
import { FilterAdvancedInput } from "../FilterAdvancedInput/FilterAdvancedInput";
import { OrderedPage, Property } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";

interface Props {
  order?: boolean;
  search?: boolean;
  filter?: boolean;
  // openedOrder?: boolean;
  // setOpenedOrder: (a: boolean) => void;
  properties: Property[];
  page?: OrderedPage;
  // children: ReactElement[] | ReactNode[];
}
export const SearchBar = ({
  order = false,
  search = false,
  filter = false,
  // openedOrder,
  // setOpenedOrder,
  properties,
  page,
}: Props) => {
  const [openedSearch, setOpenedSearch] = useState(false);
  const [openedOrder, setOpenedOrder] = useState(false);
  const [openedFilter, setOpenedFilter] = useState(false);
  const { setInput } = useContext(FilterContext);

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
      {search && openedSearch && <SearchInput />}
      {order && openedOrder && (
        <OrderInput
          setIsModalOpen={setOpenedOrder}
          page={page!}
          orderingId={page?.propertyOrdering.id}
          propertiesPage={properties}
        ></OrderInput>
      )}
      {filter && openedFilter && (
        <FilterAdvancedInput
          properties={properties}
          setIsModalOpen={setOpenedFilter}
          // isModalOpen={openedFilter}
          // setIsModalOpen={setOpenedFilter} />
        />
      )}
      {search && (
        <SearchIcon
          iconSrc={"/searchIcons/search.svg"}
          open={() => change("search")}
          acessibilityLabel="Ícone de pesquisa"
        />
      )}
      {order && (
        <SearchIcon
          iconSrc={"/searchIcons/order.svg"}
          open={() => {
            change("order");
            setInput!("");
          }}
          acessibilityLabel="Ícone de ordenação"
        />
      )}
      {filter && (
        <SearchIcon
          iconSrc={"/searchIcons/filter.svg"}
          acessibilityLabel="Ícone de filtragem"
          open={() => change("filter")}
        />
      )}
    </div>
  );
};
