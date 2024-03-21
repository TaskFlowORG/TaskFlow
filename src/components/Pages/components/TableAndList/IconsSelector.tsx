import { If } from "@/components/If";
import { IconArchive, IconCalendar, IconCheckbox, IconClock, 
  IconNumber, IconProgress, IconRadio, IconSelect, IconTag, 
  IconTask, IconText, IconUser, PageTypeIcons } from "@/components/icons";
import { Page, Property, TypeOfProperty } from "@/models";

export const IconsSelector = ({page, property}:{page?:Page, property?:Property}) => {
  return  page ? 
      <div className="min-w-[3rem] h-min w-min min-h-[3rem]">
        <PageTypeIcons type={page!.type} />
      </div>
      :
      property ?
      <div className="w-min">
        <If condition={property?.type == TypeOfProperty.ARCHIVE}>
          <IconArchive />
        </If>
        <If condition={property?.type == TypeOfProperty.CHECKBOX}>
          <IconCheckbox />
        </If>
        <If condition={property?.type == TypeOfProperty.DATE}>
          <IconCalendar />
        </If>
        <If condition={property?.type == TypeOfProperty.NUMBER}>
          <IconNumber />
        </If>
        <If condition={property?.type == TypeOfProperty.PROGRESS}>
          <IconProgress />
        </If>
        <If condition={property?.type == TypeOfProperty.RADIO}>
          <IconRadio />
        </If>
        <If condition={property?.type == TypeOfProperty.SELECT}>
          <IconSelect />
        </If>
        <If condition={property?.type == TypeOfProperty.TAG}>
          <IconTag />
        </If>
        <If condition={property?.type == TypeOfProperty.TEXT}>
          <IconText />
        </If>
        <If condition={property?.type == TypeOfProperty.TIME}>
          <IconClock />
        </If>
        <If condition={property?.type == TypeOfProperty.USER}>
          <IconUser />
        </If>
      </div>
      :
      <IconTask />
    }
