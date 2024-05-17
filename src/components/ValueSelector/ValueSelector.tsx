import { ArchiveValued, MultiOptionValued, PropertyValue, TextValued, TypeOfProperty, UniOptionValued } from "@/models";
import { CardText } from "../CardContent/CardProperties/CardText";
import { CardDate } from "../CardContent/CardProperties/CardDate";
import { CardSelect } from "../CardContent/CardProperties/CardSelect";
import { CardCheckbox } from "../CardContent/CardProperties/CardCheckbox";
import { CardTag } from "../CardContent/CardProperties/CardTags";
import { CardRadio } from "../CardContent/CardProperties/CardRadio";
import { CardFile } from "../CardContent/CardProperties/CardFile";
import { CardNumber } from "../CardContent/CardProperties/CardNumber";
import { CardTime } from "../CardContent/CardProperties/CardTime";

interface Props {
    property: PropertyValue;
    showNames?: boolean;
}

export const ValueSelector = ({property, showNames = false}:Props) => {
    function is(property: PropertyValue, type: TypeOfProperty) {
        return property.property.type == type && property.property.visible == true;
      }
        if (
          is(property, TypeOfProperty.TEXT) &&
          (property.value as TextValued).value
        ) {
          return (
            <CardText
              showNameProperty={showNames}
              property={property.property.name}
              key={property.property.id.toString()}
              text={(property.value as TextValued).value}
            />
          );
        } else if (
          is(property, TypeOfProperty.DATE) &&
          property.value.value
        ) {
          return (
            <CardDate
              showNameProperty={showNames}
              key={property.property.id.toString()}
              date={property.value.value?.dateTime}
              property={property.property.name}
            />
          );
        } else if (
          is(property, TypeOfProperty.SELECT) &&
          (property.value as UniOptionValued).value?.name
        ) {
          return (
            <CardSelect
              showNameProperty={showNames}
              property={property.property.name}
              color={(property.value as UniOptionValued).value?.color}
              key={property.property.id.toString()}
              value={(property.value as UniOptionValued).value?.name}
            />
          );
        } else if (
          is(property, TypeOfProperty.CHECKBOX) &&
          (property.value as MultiOptionValued).value.length > 0
        ) {
          return (
            <CardCheckbox
              showNameProperty={showNames}
              nameProperty={property.property.name}
              key={property.property.id.toString()}
              tags={(property.value as MultiOptionValued).value}
            />
          );
        } else if (
          is(property, TypeOfProperty.TAG) &&
          (property.value as MultiOptionValued).value.length > 0
        ) {
          return (
            <CardTag
              showNameProperty={showNames}
              nameProperty={property.property.name}
              key={property.property.id.toString()}
              tags={(property.value as MultiOptionValued).value}
            />
          );
        } else if (
          is(property, TypeOfProperty.RADIO) &&
          property.value.value
        ) {
          return (
            <CardRadio
            color={(property.value as UniOptionValued).value?.color}
              showNameProperty={showNames}
              key={property.property.id.toString()}
              property={property.property.name}
              value={(property.value as UniOptionValued).value?.name}
            />
          );
        }  else if (is(property, TypeOfProperty.ARCHIVE)) {
          return (
            <CardFile
              showNameProperty={showNames}
              property={property.property.name}
              key={property.property.id.toString()}
              name={(property.value as ArchiveValued).value?.name as string}
            />
          );
        } else if (is(property, TypeOfProperty.NUMBER)) {
          return (
            <CardNumber
              showNameProperty={showNames}
              key={property.property.id.toString()}
              property={property.property.name}
              number={property.value.value}
            />
          );
        } else if (is(property, TypeOfProperty.TIME)) {
          return (
            <CardTime
              showNameProperty={showNames}
              key={property.property.id.toString()}
              property={property.property.name}
              time={property.value.value}
            />
          );
        }
      
}