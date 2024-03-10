import { If } from "@/components/If";
import { Obj } from "@/components/Obj";
import { generateContrast } from "@/functions";
import { Property, TaskValue, TypeOfProperty, UserWithoutPermission, Option, TaskOrdered } from "@/models";

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
    <If condition={justName}>
        <div className={"w-full py-4 px-3 gap-6 h-16 select-none justify-start items-center flex " + 
         (l.task.name ? " text-zinc-600 dark:text-zinc-200":" text-zinc-400 dark:text-zinc-500") } >
            <div className="bg-zinc-200 p-[0.35rem] text-white dark:text-zinc-200 dark:bg-zinc-600 flex flex-col text-[0.5rem] rounded-full">
                <p >^</p>
                <p className="rotate-180">^</p>
            </div>
            <span className="w-full truncate">
            {l.task.name || "Sem Nome"}
            </span>
        </div>
        <div className="w-full py-4 px-6 h-16 overflow-clip  justify-start text-zinc-400 items-center flex flex-wrap truncate">
          <If condition={property?.type == TypeOfProperty.ARCHIVE}>
            <div>Archive</div>
          </If>
          <If condition={property?.type == TypeOfProperty.DATE}>
            <div>{new Date(propVl?.value.value).toLocaleDateString()}</div>
          </If>
          <If condition={property?.type == TypeOfProperty.NUMBER}>
            <div>{propVl?.value.value}</div>
          </If>
          <If condition={property?.type == TypeOfProperty.PROGRESS}>
            <div>{propVl?.value.value + "%"}</div>
          </If>
          <If condition={[TypeOfProperty.SELECT,TypeOfProperty.RADIO].includes(property?.type!)}>
            {propVl?.value.value == null ??
              <div className="p-1 rounded-md"
                style={{ backgroundColor: propVl?.value.value.color,
                  color: generateContrast(propVl?.value.value.color),}}>
                {propVl?.value.value.name}
              </div>
            }
          </If>
          <If condition={ [TypeOfProperty.TAG, TypeOfProperty.CHECKBOX].includes(property?.type!)}>
            <div className="flex gap-1 w-min max-w-[10rem] overflow-auto">
              {generateList(propVl).map((opt) => {
                return (
                  <div key={opt.id} className="p-1 rounded-md"
                    style={{ backgroundColor: opt.color,
                      color: generateContrast(opt.color),}}>
                    {opt.name}
                  </div>
                )})}
            </div>
          </If>
          <If condition={property?.type == TypeOfProperty.TEXT}>
            <div>{propVl?.value.value}</div>
          </If>
          <If condition={property?.type == TypeOfProperty.TIME}>
            <div>
              {!propVl?.value.value || propVl?.value.value.toString().slice(0, 8)}
            </div>
          </If>
          <If condition={property?.type == TypeOfProperty.USER}>
            <div>
              <Obj objs={propVl?.value.value as Array<UserWithoutPermission>}
                max={5} functionObj={() => {}}
              />
            </div>
          </If>
        </div>
    </If>
  );
};
