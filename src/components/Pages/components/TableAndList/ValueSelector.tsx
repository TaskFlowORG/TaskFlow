import { Tag } from "@/components/CardContent/CardProperties/Tag";
import { If } from "@/components/If";
import { Obj } from "@/components/Obj";
import { IconArchive } from "@/components/icons";
import { generateContrast } from "@/functions";
import { Property, TaskValue, TypeOfProperty, UserWithoutPermission, Option, TaskOrdered, ArchiveValued, Archive } from "@/models";

interface Props {
    justName: boolean;
    property?: Property;
    propVl?: TaskValue;
    l: TaskOrdered;
}
export const ValueSelector = ({justName, property, propVl, l}:Props) => {
function generateList(value: TaskValue | null | undefined): Array<Option> {
    let list = new Array<Option>
    if (!value) return list
    if (value.property.type == TypeOfProperty.CHECKBOX || value.property.type == TypeOfProperty.TAG) {
        let val = value.value.value as Option[]
        for (let opt of val) {
            list.push(opt)
        }
    }
    return list
}
  return (
      
        justName ? 
        <div className={"py-4 px-3 gap-6 h-12 sm:h-16 select-none justify-start items-center flex w-[98%]" +  (l.task.name ? " text-zinc-600 dark:text-zinc-200":" text-zinc-400 dark:text-zinc-500") } >
            <div className="bg-zinc-200 p-[0.35rem] text-white dark:text-zinc-200 dark:bg-zinc-600 w-min flex flex-col text-[0.5rem] rounded-full">
                <p >^</p>
                <p className="rotate-180">^</p>
            </div>  
            <span className="w-min truncate">
            {l.task.name || "Sem Nome"}
            </span>
        </div>
        :
        <div className="flex p text-zinc-600 dark:text-zinc-200 gap-4 p-3 h-14 w-[98%] items-center justify-start ">
          <If condition={property?.type == TypeOfProperty.ARCHIVE}>
            {propVl?.value.value == undefined ?
                <div className="h-min w-min truncate">Sem Arquivo</div>
                :
                <div className="p-1 rounded-full border-1 border-zinc-300 dark:border-zinc-800 w-min truncate">
                  {(propVl?.value.value as Archive).name + "."+(propVl?.value.value as Archive).type}
                </div>
            }
          </If>
          <If condition={property?.type == TypeOfProperty.DATE}>
            {propVl?.value.value == undefined ?
                <p className="h-min w-min truncate" >Sem Data</p>
                :
                <div className="h-min w-min truncate">{new Date(propVl?.value.value).toLocaleDateString()}</div>
            }
          </If>
          <If condition={property?.type == TypeOfProperty.NUMBER}>
            <div className="h-min w-min truncate">{propVl?.value.value ?? "Sem Valor"}</div>
          </If>
          <If condition={property?.type == TypeOfProperty.PROGRESS}>
            <div className="h-min w-min truncate">{propVl?.value.value ? propVl?.value.value + "%":"Sem Valor"}</div>
          </If>
          <If condition={[TypeOfProperty.SELECT,TypeOfProperty.RADIO].includes(property?.type!)}>
            {propVl?.value.value == null ??
              <Tag color={propVl?.value.value.color} value={propVl?.value.value.name} />
            }
          </If>
          <If condition={ [TypeOfProperty.TAG, TypeOfProperty.CHECKBOX].includes(property?.type!)}>
            <div className="flex gap-1 h-full w-full items-start overflow-y-auto flex-wrap">
              {generateList(propVl).map((opt) => {
                return (
                  <Tag key={opt.id} color={opt.color} value={opt.name} />
                )})}
            </div>
          </If>
          <If condition={property?.type == TypeOfProperty.TEXT}>
            <div className="h-min w-min truncate">{propVl?.value.value ?? "Sem valor"}</div>
          </If>
          <If condition={property?.type == TypeOfProperty.TIME}>
            <div className="h-min w-min truncate">
              {propVl?.value.value ? propVl?.value.value.toString().slice(0, 8) : "00:00:00"}
            </div>
          </If>
          <If condition={property?.type == TypeOfProperty.USER}>
            <div className="relative w-full h-min">
              <Obj objs={propVl?.value.value as Array<UserWithoutPermission>}
                max={5} functionObj={() => {}}
              />
            </div>
          </If>
        </div>
      
  );
};
