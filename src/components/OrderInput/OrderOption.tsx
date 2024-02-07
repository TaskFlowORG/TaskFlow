import { Property } from "@/model/Properties/Property";
import Image from "next/image";
interface OrderOptionType {
  property: Property;
  isOrderingProperty?: boolean;
  updateOrderingProperty?:(e:any)=>void
}

export const OrderOption = ({
  property,
  isOrderingProperty,
  updateOrderingProperty
}: OrderOptionType) => {
  return (
    <div
    onClick={updateOrderingProperty}
      id={property.id.toString()}
      className={`flex w-full p-2 text-center rounded-lg bg-[#F2F2F2] ${
        isOrderingProperty ? "justify-between" : "justify-center"
      }`
    }
    >
      <p>{property.name}</p>
      {isOrderingProperty && <Image src={"ok.svg"} width={16} height={16} alt="NaN" />}
    </div>
  );
};
