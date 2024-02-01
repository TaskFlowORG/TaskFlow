import { CommonPage } from "@/model/pages/CommonPage";
import { Property } from "@/model/Properties/Property";

  interface Props {
    properties: Property[];
    orderingId: number | undefined;
    page: CommonPage;
  }


export const FilterAdvancedInput = ({properties, orderingId, page}:Props) => {
  return (
    <div>

    </div>
  )
}
