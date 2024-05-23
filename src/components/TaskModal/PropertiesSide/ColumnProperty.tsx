import { CheckboxFilter } from "@/components/FilterAdvancedInput/CheckboxFilter";
import { RadioFilter } from "@/components/FilterAdvancedInput/RadioFilter";
import { TagFilter } from "@/components/FilterAdvancedInput/TagFilter";
import { PropertyValue, Select, TypeOfProperty } from "@/models";

type Props = {
  prop: PropertyValue;
};
export const ColumnProperty = ({ prop }: Props) => {
  switch (prop.property.type) {
    case TypeOfProperty.RADIO:
      return <RadioFilter
        isInModal
        name={prop.property.name}
        id={prop.property.id}
        options={(prop.property as Select).options}
        value={prop.value.value?.name ?? "244a271c-ab15-4620-b4e2-a24c92fe4042"}
      />;
    case TypeOfProperty.CHECKBOX:
    return  <CheckboxFilter
        isInModal
        name={prop.property.name}
        options={(prop.property as Select).options}
        id={prop.property.id}
        value={prop.value.value?.map((option: any) => option.name)}
      />;
    case TypeOfProperty.TAG:
     return <TagFilter
        isInModal
        name={prop.property.name}
        options={(prop.property as Select).options}
        id={prop.property.id}
        value={prop.value.value?.map((option: any) => option.name)}
      />;
  }
};
