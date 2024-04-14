import { InputCalendar } from "@/components/InputCalendar";
import { compareDates } from "@/components/Pages/functions";
import { IconCalendar } from "@/components/icons";
import { ProjectContext } from "@/contexts";
import { Property, PropertyValue, TaskPage, TypeOfProperty } from "@/models";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { Bar } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { ChartOptions } from "chart.js";
import { UserContext } from "@/contexts/UserContext";

export const TasksDate = () => {
  const { project } = useContext(ProjectContext);
  const [day, setDay] = useState<Date>(new Date(Date.now()));
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [color, setColor] = useState<string>("#000000");
  const properties =
    project?.properties.filter((p) => p.type == TypeOfProperty.DATE) ?? [];
  const [property, setProperty] = useState<Property | undefined>(properties[0]);

  useEffect(() => {
    if (!user || !project) return;
    setColor(
      theme === "dark"
        ? user.configuration.secondaryColor
        : user.configuration.primaryColor
    );
  }, [user, project, theme]);

  if (!property)
    return (
      <div className="shadow-blur-10 w-full h-64 md:h-1/2 text-center  rounded-md p-4 flex flex-col justify-center items-center">
        <p>{t("no-properties-date")}</p>
      </div>
    );

  const tasks = project?.pages.flatMap((p) => p.tasks) ?? [];
  const checkDay = (property: PropertyValue | undefined, day: Date) => {
    if (!property) return false;
    if (!property.value) return false;
    if (!property.value.value) return false;
    return compareDates(new Date(property.value.value), day);
  };
  const getPropVl = (task: TaskPage) => {
    return task.task.properties.find((p) => p.property.id == property?.id);
  };
  const daysOfWeek = [
    t("sunday"),
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
  ];
  const data = [
    ...Array.from(
      { length: 7 },
      (_, i) => new Date(day.getFullYear(), day.getMonth(), day.getDate() + i)
    ),
  ].map((day: Date) => {
    return {
      name: daysOfWeek[day.getDay()],
      tasks: tasks.filter((t) => checkDay(getPropVl(t), day)).length,
    };
  });
  const dataFormatted = {
    labels: data.map((data) => data.name),
    datasets: [
      {
        label: t("tasks"),
        data: data.map((data) => data.tasks),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#FCFCFC" : "#3C3C3C",
        },
        grid: {
          color: theme === "dark" ? "#FCFCFC33" : "#3C3C3C33",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#FCFCFC" : "#3C3C3C",
        },
        grid: {
          color: theme === "dark" ? "#FCFCFC33" : "#3C3C3C33",
        },
      },
    },
  };
  return (
    <div className="w-full h-64 md:h-1/2 flex flex-col gap-4 dark:bg-dark-800 rounded-md shadow-blur-10 p-4">
      <span className="flex justify-between w-full">
        <select
          className="w-32 flex text-center h-8 border-primary judtify-center border-2 "
          onChange={(e) =>
            setProperty(properties.find((p) => p.id == +e.target.value))
          }
          defaultValue={property?.id}
        >
          {properties.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <span className="relative w-min h-min">
          <InputCalendar
            icon={<IconCalendar />}
            value={day.toISOString().split("T")[0]}
            setValue={(vl) => setDay(new Date(vl))}
          />
        </span>
      </span>
      <div className="w-full h-full flex justify-center">
        <div className="w-min h-full  flex justify-center items-center">
          <Bar
            data={dataFormatted}
            options={{ ...options, backgroundColor: color }}
            color="#ff0000"
          />
        </div>
      </div>
    </div>
  );
};
