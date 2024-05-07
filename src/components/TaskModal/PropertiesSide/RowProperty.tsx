import { DateFilter } from "@/components/FilterAdvancedInput/DateFilter";
import { FileFilter } from "@/components/FilterAdvancedInput/FilteFilter";
import { NumberFilter } from "@/components/FilterAdvancedInput/NumberFilter";
import { ProgressFilter } from "@/components/FilterAdvancedInput/ProgressFilter";
import { TextFilter } from "@/components/FilterAdvancedInput/TextFilter";
import { TimeFilter } from "@/components/FilterAdvancedInput/TimeFilter";
import { UserFilter } from "@/components/FilterAdvancedInput/UserFilter";
import { Select as Selectt } from "@/components/Select";
import {
  OtherUser,
  PropertyValue,
  Select,
  Task,
  TypeOfProperty,
} from "@/models";

type Props = {
  prop: PropertyValue;
  task: Task;
};

export const RowProperty = ({ prop, task }: Props) => {
  switch (prop.property.type) {
    case TypeOfProperty.SELECT:
      return (
        <Selectt
          isInModal
          name={prop.property.name}
          ids={prop.property.id}
          options={(prop.property as Select).options.map(
            (option) => option.name
          )}
          value={
            prop.value.value?.name ?? "244a271c-ab15-4620-b4e2-a24c92fe4042"
          }
        />
      );
    case TypeOfProperty.ARCHIVE:
      return (
        <FileFilter
          isInModal
          id={prop.property.id}
          task={task}
          propertyValue={prop.value as PropertyValue}
          name={prop.property.name}
          value={prop.value?.value}
        />
      );
    case TypeOfProperty.USER:
      return (
        <UserFilter
          isInModal
          id={prop.property.id}
          name={prop.property.name}
          value={(prop.value?.value as OtherUser[])?.map(
            (user) => user.username
          )}
        />
      );
    case TypeOfProperty.NUMBER:
      return (
        <NumberFilter
          isInModal
          id={prop.property.id}
          name={prop.property.name}
          value={prop.value?.value}
        />
      );
    case TypeOfProperty.TIME:
      return (
        <TimeFilter
          task={task}
          isInModal
          id={prop.property.id}
          name={prop.property.name}
          value={prop.value?.value}
        />
      );
    case TypeOfProperty.PROGRESS:
      return (
        <ProgressFilter
          isInModal
          id={prop.property.id}
          name={prop.property.name}
          value={prop.value?.value}
        />
      );
    case TypeOfProperty.DATE:
      return (
        <DateFilter
          isInModal
          id={prop.property.id}
          name={prop.property.name}
          value={prop.value?.value}
        />
      );

    case TypeOfProperty.TEXT:
      return (
        <TextFilter
          isInModal
          id={prop.property.id}
          name={prop.property.name}
          value={prop.value.value}
        />
      );
  }
};
