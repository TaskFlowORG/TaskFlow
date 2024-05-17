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
  let prop: Value | null = null;
  switch (propertyObj.type) {
    case TypeOfProperty.TIME:
      prop = new TimeValued(new Interval(new Duration(0, 0, 0), "#f04A94"));
    case TypeOfProperty.DATE:
      prop = new DateValued(null);
    case TypeOfProperty.CHECKBOX:
    case TypeOfProperty.TAG:
      prop = new MultiOptionValued([]);
    case TypeOfProperty.SELECT:
    case TypeOfProperty.RADIO:
      prop = new UniOptionValued(null);
    case TypeOfProperty.TEXT:
      prop = new TextValued(null);
    case TypeOfProperty.NUMBER:
      prop = new NumberValued(null);
    case TypeOfProperty.NUMBER:
    case TypeOfProperty.PROGRESS:
      prop = new NumberValued(null);
    case TypeOfProperty.USER:
      prop = new UserValued([]);
    case TypeOfProperty.ARCHIVE:
      prop = new ArchiveValued(null);
  }

  prop.id = null;
  return prop;
}
