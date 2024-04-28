import {
  Property,
  TypeOfProperty,
  TimeValued,
  DateValued,
  MultiOptionValued,
  UniOptionValued,
  TextValued,
  NumberValued,
  UserValued,
  ArchiveValued,
  Value,
} from "@/models";
import { Duration } from "@/models/values/Duration";
import { Interval } from "@/models/values/Interval";

export function createValue(propertyObj: Property): Value | undefined {
  switch (propertyObj.type) {
    case TypeOfProperty.TIME:
      return new TimeValued(new Interval(new Duration(0, 0, 0)));
    case TypeOfProperty.DATE:
      return new DateValued(null);
    case TypeOfProperty.CHECKBOX:
    case TypeOfProperty.TAG:
      return new MultiOptionValued([]);
    case TypeOfProperty.SELECT:
    case TypeOfProperty.RADIO:
      return new UniOptionValued(null);
    case TypeOfProperty.TEXT:
      return new TextValued(null);
    case TypeOfProperty.NUMBER:
      return new NumberValued(null);
    case TypeOfProperty.NUMBER:
    case TypeOfProperty.PROGRESS:
      return new NumberValued(null);
    case TypeOfProperty.USER:
      return new UserValued([]);
    case TypeOfProperty.ARCHIVE:
      return new ArchiveValued(null);
  }
}
