import { InputCalendar } from "@/components/InputCalendar";
import { compareDates } from "@/components/Pages/functions";
import { InputDate } from "@/components/Properties/InputDate/InputDate";
import { IconCalendar } from "@/components/icons";
import { ProjectContext } from "@/contexts";
import { Property, PropertyValue, TaskPage, TypeOfProperty } from "@/models";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { Bar, BarChart, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const TasksDate = () => {
  const { project } = useContext(ProjectContext);
  const [day, setDay] = useState<Date>(new Date(Date.now()));
  const properties =
    project?.properties.filter((p) => p.type == TypeOfProperty.DATE) ?? [];
  const [property, setProperty] = useState<Property | undefined>(properties[0]);
  const tasks = project?.pages.flatMap((p) => p.tasks) ?? [];
  const checkDay = (property: PropertyValue | undefined, day: Date) => {
    if (!property) return false;
    if (!property.value) return false;
    if (!property.value.value) return false;
    return compareDates(property.value.value, day);
  };
  const getPropVl = (task: TaskPage) => {
    return task.task.properties.find((p) => p.property.id == property?.id);
  };
  const { t } = useTranslation();
  const daysOfWeek = [t('sunday'), t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday')];
  const data = ([
    ...Array.from({length: 7}, (_, i) => new Date(day.getFullYear(), day.getMonth(), day.getDate() + i))
    ]).map((day:Date) => {
        return {
            name: daysOfWeek[day.getDay()],
            tasks: tasks.filter((t) => checkDay(getPropVl(t), day)).length,
        };  
    },)
    const{theme} = useTheme();
    const color = theme == "light" ? "var(--primary-color)" : "var(--secondary-color)";
  return (
    <div className="w-96 h-96 bg-white dark:bg-dark-800 rounded-md shadow-blur-10 p-4">
 <span className="flex justify-between w-full">
            <h5 className=" h5 text-primary dark:text-secondary">
              {t("tasks-date")}
            </h5>
            <span className="flex flex-col">
              <select className="w-32 flex text-center h-8 border-primary judtify-center border-2 " onChange={e => setProperty(properties.find(p => p.id == +e.target.value))} >
                {properties.map((option, index) => (
                  <option
                    key={index}
                    value={option.id}
                    selected={option.id == property?.id}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            <span className="relative w-min h-min">

            <InputCalendar icon={<IconCalendar/>} value={day.toISOString().split("T")[0]} 
            setValue={(vl) => setDay(new Date(vl))} />
            </span>
            </span>
          </span>
      <ResponsiveContainer width="100%" height="100%" aspect={2.5}>
        <BarChart data={data} margin={{left:-30}}  >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  />
          <Bar
            dataKey="tasks"
            fill={color}
            activeBar={<Rectangle fill="" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
