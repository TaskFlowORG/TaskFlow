import { SearchIcon } from "./SearchIcon";
import { SearchInput } from "./SearchInput";
import { ReactElement, ReactNode, useContext, useState } from "react";
import { OrderInput } from "../OrderInput";
import { FilterAdvancedInput } from "../FilterAdvancedInput/FilterAdvancedInput";
import { OrderedPage, Property } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { IconFilter } from "../icons/OptionsFilter/Filter";
import { IconOrder } from "../icons/OptionsFilter/Order";
import { IconSearch } from "../icons/OptionsFilter/Search";
import { AnimatePresence, motion } from "framer-motion";
import { LocalModal } from "../Modal";

interface Props {
  order?: boolean;
  search?: boolean;
  filter?: boolean;
  invert?: boolean;
  // openedOrder?: boolean;
  // setOpenedOrder: (a: boolean) => void;
  properties?: Property[];
  page?: OrderedPage;
  isInCalendar?: boolean;
  // children: ReactElement[] | ReactNode[];
}
export const SearchBar = ({
  order = false,
  search = false,
  filter = false,
  invert = false,
  // openedOrder,
  // setOpenedOrder,
  properties = [],
  page,
  isInCalendar = false,
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
      // setOpenedSearch(false);
      setOpenedFilter(!openedFilter);
      setOpenedOrder(false);
    } else {
      // setOpenedSearch(false);
      setOpenedFilter(false);
      setOpenedOrder(!openedOrder);
    }
  }

  return (
    <div className="justify-end w-full items-center  relative  h-full flex gap-2 ">
      <AnimatePresence initial={false} mode="wait">
        {search && openedSearch && (
          <motion.span
            initial={{ width: "0px" }}
            animate={{ width: "fit-content" }}
            exit={{ width: "0px" }}
            className="overflow-clip p-1"
          >
            <SearchInput
              setIsModalOpen={(bool: boolean) => setOpenedSearch(bool)}
            />
          </motion.span>
        )}
      </AnimatePresence>
      {search && (
        <SearchIcon
          invert={invert}
          icon={
            <IconSearch
              classes={invert ? "text-primary dark:text-secondary" : undefined}
            />
          }
          open={() => {
            change("search");
            setInput!("");
          }}
          acessibilityLabel="Ícone de pesquisa"
        />
      )}
      {order && (
        <span className="relative">

          <SearchIcon
            invert={invert}
            icon={
              <IconOrder
                classes={invert ? "text-primary dark:text-secondary" : undefined}
              />
            }
            open={() => {
              change("order");
            }}
            acessibilityLabel="Ícone de ordenação"
          />
          <LocalModal condition={openedOrder} setCondition={setOpenedOrder} right>


          <OrderInput
          setIsModalOpen={setOpenedOrder}
          page={page!}
          isInCalendar={isInCalendar}
          orderingId={page?.propertyOrdering.id}
          propertiesPage={properties}
        ></OrderInput>
          </LocalModal>
        </span>
      )}
      {filter && (
        <span className="relative">
          <SearchIcon
            invert={invert}
            icon={
              <IconFilter
                classes={
                  invert ? "text-primary dark:text-secondary" : undefined
                }
              />
            }
            acessibilityLabel="Ícone de filtragem"
            open={() => change("filter")}
          />
          <LocalModal
            condition={openedFilter}
            setCondition={setOpenedFilter}
            right
          >
            <FilterAdvancedInput
              properties={properties}
              setIsModalOpen={setOpenedFilter}
              // isModalOpen={openedFilter}
              // setIsModalOpen={setOpenedFilter} />
            />
          </LocalModal>
        </span>
      )}
    </div>
  );
};
