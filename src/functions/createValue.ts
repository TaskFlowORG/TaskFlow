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
import { DateWithGoogle } from "@/models/values/DateValued";
import { Duration } from "@/models/values/Duration";
import { Interval } from "@/models/values/Interval";

export function createValue(propertyObj: Property): Value | undefined {
  let prop: Value | null = null;
  
  switch (propertyObj.type) {
    case TypeOfProperty.TIME:
      prop = new TimeValued(new Interval(new Duration(0, 0, 0), "#f04A94"));
      break;
    case TypeOfProperty.DATE:
      prop = new DateValued(new DateWithGoogle(null, "", null));
      break;
      case TypeOfProperty.CHECKBOX:
    case TypeOfProperty.TAG:
      prop = new MultiOptionValued([]);
      break;
      case TypeOfProperty.SELECT:
    case TypeOfProperty.RADIO:
      prop = new UniOptionValued(null);
      break;
      case TypeOfProperty.TEXT:
      prop = new TextValued(null);
      break;
      case TypeOfProperty.NUMBER:
      prop = new NumberValued(null);
      break;
      case TypeOfProperty.NUMBER:
    case TypeOfProperty.PROGRESS:
      prop = new NumberValued(null);
      break;
      case TypeOfProperty.USER:
      prop = new UserValued([]);
      break;
      case TypeOfProperty.ARCHIVE:
      prop = new ArchiveValued(null);
      break;
  }

  prop.id = null;
  return prop;
}
