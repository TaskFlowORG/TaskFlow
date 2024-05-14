import { Task, TypeOfProperty } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { Context, useContext } from "react";
import { FilterContextType } from "@/types/FilterContext";
import { Option } from "@/models";
import { FilteredProperty } from "@/types/FilteredProperty";
import { PropertyValue } from "@/models";

const findPropertyInTask = (
  task: Task,
  prop: FilteredProperty
): PropertyValue => {
  return task.properties.find((property) => property.property.id == prop.id)!;
};

const isValueMatchingInput = (value: string, inputValue: string): boolean => {
  return value.toLowerCase().includes(inputValue.toLowerCase()!);
};
const hasPassedFilters = (counter: number, expected: number): boolean => {
  return counter == expected || expected == 0;
};

const multiValuePropertyPassesFilter = (
  counter: number,
  property: FilteredProperty,
  propertyInTask: PropertyValue
): number => {
  if (property.value.length > 0) {
    for (const value of property.value) {
      for (const option of propertyInTask.value.value) {
        if (option.name === value) {
          return counter + 1;
        }
      }
    }
  } else {
    return counter + 1;
  }
  return counter;
};

const uniValuePropertyPassesFilter = (
  counter: number,
  property: FilteredProperty,
  propertyInTask: PropertyValue
): number => {
  return (propertyInTask.value.value as Option)?.name == property.value
    ? counter + 1
    : counter;
};

const textValuePropertyPassesFilter = (
  counter: number,
  property: FilteredProperty,
  propertyInTask: PropertyValue
): number => {
  return propertyInTask.value?.value
    ?.toLowerCase()
    .includes(property.value.toLowerCase())
    ? counter + 1
    : counter;
};

const numberValuePropertyPassesFilter = (
  counter: number,
  property: FilteredProperty,
  propertyInTask: PropertyValue
): number => {
  return propertyInTask.value.value == property.value ? counter + 1 : counter;
};

export function showTask(task: Task, context: FilterContextType): boolean {
  const { filterProp, input } = context;
  const multiOptionTypes = [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG];
  const uniOptionTypes = [TypeOfProperty.SELECT, TypeOfProperty.RADIO];
  const textTypes = [TypeOfProperty.TEXT, TypeOfProperty.DATE];
  if (isValueMatchingInput(task.name ?? "", input!)) {
    let counter = 0;
    filterProp?.forEach((prop) => {
      const propertyInTask = findPropertyInTask(task, prop);
      if (multiOptionTypes.includes(propertyInTask?.property.type)) {
        counter = multiValuePropertyPassesFilter(counter, prop, propertyInTask);
      } else if (uniOptionTypes.includes(propertyInTask?.property.type)) {
        counter = uniValuePropertyPassesFilter(counter, prop, propertyInTask);
      } else if (textTypes.includes(propertyInTask?.property.type)) {
        counter = textValuePropertyPassesFilter(counter, prop, propertyInTask);
      } else {
        counter = numberValuePropertyPassesFilter(
          counter,
          prop,
          propertyInTask
        );
      }
    });
    if (hasPassedFilters(counter, filterProp?.length ?? 0)) {
      return true;
    }
  }
  return false;
}
