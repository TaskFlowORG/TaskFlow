import { useHasPermission } from "@/hooks/useHasPermission";
import { Property } from "@/models";
import Image from "next/image";
interface OrderOptionType {
  property: Property;
  isOrderingProperty?: boolean;
  updateOrderingProperty?: (e: any) => void;
}

export const OrderOption = ({
  property,
  isOrderingProperty,
  updateOrderingProperty,
}: OrderOptionType) => {
  const permission = useHasPermission("update");
  return (
    <div
      onClick={(e) => permission && updateOrderingProperty != undefined && updateOrderingProperty(e)}
      id={property.id.toString()}
      className={`flex w-full p-2 text-center dark:bg-modal-grey  shadow-light dark:shadow-blur-10 text-black dark:text-white rounded-lg bg-[#F2F2F2] ${
        isOrderingProperty ? "justify-between" : "justify-center"} 
        ${
        permission ? "cursor-pointer" : "cursor-not-allowed opacity-75"}`}
    >
      <p>{property.name}</p>
      {isOrderingProperty && (
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="currentColor"
          className="text-primary dark:text-secondary"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 18.5C13.9707 18.5 18 14.4707 18 9.5C18 4.5293 13.9707 0.5 9 0.5C4.0293 0.5 0 4.5293 0 9.5C0 14.4707 4.0293 18.5 9 18.5ZM13.8339 6.6515C13.876 6.60813 13.9089 6.55671 13.9307 6.50033C13.9525 6.44395 13.9627 6.38375 13.9608 6.32334C13.9588 6.26292 13.9447 6.20352 13.9192 6.14869C13.8938 6.09385 13.8576 6.0447 13.8127 6.00418C13.7678 5.96365 13.7153 5.93257 13.6582 5.91281C13.601 5.89304 13.5405 5.88498 13.4802 5.88912C13.4199 5.89326 13.361 5.9095 13.3072 5.93688C13.2533 5.96427 13.2054 6.00223 13.1665 6.0485L7.776 12.0051L4.8105 9.1742C4.72421 9.09173 4.6087 9.04692 4.48937 9.04962C4.37004 9.05232 4.25667 9.10231 4.1742 9.1886C4.09173 9.27489 4.04692 9.3904 4.04962 9.50973C4.05232 9.62906 4.10231 9.74243 4.1886 9.8249L7.4889 12.9749L7.82325 13.2944L8.1333 12.9515L13.8339 6.6515Z"
          />
        </svg>
      )}
    </div>
  );
};
