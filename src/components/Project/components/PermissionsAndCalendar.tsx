import Calendar from "react-calendar";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import {
  Language,
  Permission,
  PermissionPost,
  Property,
  Task,
  TypeOfProperty,
  TypePermission,
} from "@/models";
import { useTheme } from "next-themes"; 
import { ProjectContext } from "@/contexts";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { Button } from "@/components/Button";
import { If } from "@/components/If";
import { permissionService } from "@/services";
import { PermissionComponent } from "./PermissionComponent";
import { compareDates } from "@/components/Pages/functions";
export const PermissionsAndCalendar = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [openPermissions, setOpenPermissions] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [locale, setLocale] = useState<string>("en-US");
  const { project } = useContext(ProjectContext);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const properties =
    project?.properties.filter((p) => p.type == TypeOfProperty.DATE) ?? [];
  const [property, setProperty] = useState<Property | undefined>(properties[0]);

  useEffect(() => {
    if (!user || !project) return;
    setLocale(getLocale());
    (async () => {
      const permissionsTemp = await permissionService.findAll(project?.id);
      setPermissions(permissionsTemp);
    })();
  }, [user, project]);

  const getLocale = () => {
    switch (user?.configuration.language) {
      case Language.PORTUGUESE:
        return "pt-PT";
      case Language.SPANISH:
        return "es-ES";
      default:
        return "en-US";
    }
  };
  const tasks = project?.pages.flatMap((p) => p.tasks) ?? [];
  const values = tasks.map(
    (t) =>
      new Date(
        t.task.properties.find(
          (p) => p.property.id == property?.id
        )?.value.value
      )
  );
  useClickAway(ref, () => setOpenPermissions(false));
  const tileContent = ({ date }: { date: Date }) => {
    // Verifica se a data atual está na lista de datas destacadas
    const isHighlighted = values.some(
      (highlightedDate) =>
        highlightedDate.getDate() === date.getDate() &&
        highlightedDate.getMonth() === date.getMonth() &&
        highlightedDate.getFullYear() === date.getFullYear()
    );
    let bg = "";
    if (theme == "dark")
      bg =
        date.getDay() === 0 || date.getDay() == 6
          ? "var(--primary-color)"
          : "var(--secondary-color)";
    else
      bg =
        date.getDay() === 0 || date.getDay() == 6
          ? "var(--secondary-color)"
          : "var(--primary-color)";
    bg = compareDates(date, new Date()) ?  "var(--contrast-color)" : bg;
    // Se a data estiver destacada, retorna um elemento com uma bolinha
    if (isHighlighted) {
      return (
        <div
          className="absolute top-[2px]  aspect-square h-[0.35rem] rounded-full right-[2px]"
          style={{ backgroundColor: bg }}
        />
      );
    }

    // Se a data não estiver destacada, retorna null
    return null;
  };

  const postPermission = async () => {
    if (!project) return;
    const permission = await permissionService.insert(
      new PermissionPost("", TypePermission.READ, false, project),
      project?.id
    );
    setPermissions([...permissions, permission]);
  };

  const [permissionEditing, setPermissionEditing] = useState<Permission>();

  const [date, setDate] = useState<Date>(new Date());
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  useEffect(() => {
    const tasksFiltering = tasks
      .filter((t) => {
        const propVl = t.task.properties.find(
          (p) => p.property.id == property?.id
        );
        return (
          propVl &&
          propVl.value &&
          propVl.value.value &&
          compareDates(new Date(propVl.value.value), date)
        );
      })
      .map((t) => t.task);
    setFilteredTasks(tasksFiltering);
  }, [date, property]);

  const refButton = useRef<HTMLButtonElement>(null);
  const [padding, setPadding] = useState<number>(0);
  useEffect(() => {
    if (refButton.current) {
      if(window.innerWidth>640){
        setPadding(refButton.current.clientHeight);
      }else{
        setPadding(0);
      }
    }
  }, [refButton.current]);
  return (
    <div
      className="w-full h-64  sm:h-auto sm:w-1/5 md:h-full sm:min-w-[150px] mt-4 mb-24 pb-4 sm:mt-[3px] sm:mb-px  
      sm:pb-0 shadow-blur-10 rounded-md sm:absolute sm:top-6 sm:bottom-4 md:top-0 md:relative
    flex sm:flex-col  overflow-clip pt-6 md:w-1/4 justify-between right-4 flex-row"
    >
      <div className="px-4 w-full">
        <If condition={property != undefined}>
          <>
            <span className="flex flex-col">
              <select
                className="w-full bg-transparent flex text-center p-1 h-min text-primary text-p font-montserrat  dark:text-secondary "
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
            </span>
            <Calendar
              locale={locale}
              tileContent={tileContent}
              calendarType="gregory"
              value={date}
              onChange={(props) => setDate(props as Date)}
              view="month"
            />
          </>
          <p className="w-full h-full flex text-center text-p justify-center items-center">
            {t("no-properties-date")}
          </p>
        </If>
      </div>
      <If condition={property != undefined}>
        <div  style={{paddingBottom:padding}} className="h-full w-full overflow-y-auto px-4 none-scrollbar pt-14 sm:pt-0">
          <div className="justify-start h-min grid sm:grid-cols-1 text-start grid-cols-2 xl:grid-cols-2 xl:text-center w-full">
            {filteredTasks.map(
              (task, index) => (
                <span key={index} className="w-full  flex">
                  <p
                  title={task.name ?? t("withoutname")}
                    className="w-full h-min truncate"
                    style={{ opacity: task.name ? 1 : 0.5 }}
                  >
                    {task.name ?? t("withoutname")}
                  </p>
                </span>
              ),
              []
            )}
          </div>
        </div>
      </If>
      <div
        className="w-full  flex-1 flex-col rounded-t-md shadow-blur-10 bg-primary h-min
                    dark:bg-secondary flex justify-start items-center absolute bottom-0 left-0"
      >
        <button
          ref={refButton}
          className="w-min sm:w-full h-min whitespace-nowrap flex flex-col items-center"
          onClick={() => setOpenPermissions(!openPermissions)}
        >
          <h5 className=" tex-h5 font-alata w-min  whitespace-nowrap flex-nowrap text-contrast pt-6">
            {t("access-level")}
          </h5>
          <p className="w-full whitespace-normal smm:whitespace-nowrap  sm:whitespace-normal font-montserrat text-p sm:text-p14 md:text-p  text-contrast pb-6">
            {t("permissions-user-levels")}
          </p>
        </button>
        <AnimatePresence initial={false} mode="wait">
          {openPermissions && (
            <>
              <motion.div
                ref={ref}
                initial={{ height: "0vh" }}
                animate={{ height: "40vh" }}
                exit={{ transition: { delay: 0.2 }, height: "0vh" }}
                transition={{ duration: 0.1 }}
                className="overflow-y-clip px-4 w-full flex flex-col items-center "
              >
                <div className="h-4/5  overflow-y-auto none-scrollbar flex flex-col gap-4 ">
                  {permissions.map((permission, index) => (
                    <PermissionComponent
                      setPermissions={setPermissions}
                      permissionEditing={permissionEditing}
                      permission={permission}
                      key={index}
                      permissions={permissions}
                      setPermissionEditing={setPermissionEditing}
                    />
                  ))}
                </div>
                <If condition={project?.owner.id == user?.id}>
                  <Button
                    text={t("create-a-permission")}
                    border="border-2 border-contrast"
                    textColor="text-contrast"
                    width="w-full"
                    paddingY="py-2"
                    padding="p-2"
                    textSize="text-p14 md:text-p "
                    fnButton={() => postPermission()}
                  />
                </If>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
