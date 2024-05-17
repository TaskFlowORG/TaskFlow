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

type PropsForm = {
  property: PropertyValue;
  errors: string[];
};

type Props = {
  prop: PropertyValue;
  task: Task;
  formProps: PropsForm[];
  setFormProps: (prop: PropsForm[]) => void;
  setErrors: (boolean: boolean) => void;
};

export const RowProperty = ({
  prop,
  task,
  formProps,
  setFormProps,
  setErrors,
}: Props) => {
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
      console.log(prop
        
      );
      return (
        <FileFilter
          isInModal
          id={prop.property.id}
          task={task}
          property={prop.property}
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
        <>
          <TimeFilter
            setErrors={setErrors}
            formProps={formProps}
            setFormProps={setFormProps}
            formProp={
              formProps.find(
                (propV) => propV.property.property.id == prop.property.id
              )!
            }
            property={prop.property}
            task={task}
            isInModal
            id={prop.property.id}
            name={prop.property.name}
            value={prop.value?.value}
          />
        </>
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
          property={prop.property}
          id={prop.property.id}
          name={prop.property.name}
          value={prop.value?.value?.dateTime}
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
