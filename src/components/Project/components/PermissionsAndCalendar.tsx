import Calendar from "react-calendar";
import { useTranslation } from "next-i18next";
import { use, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Language, Permission, Property, TypeOfProperty } from "@/models";
import { useTheme } from "next-themes";
import { ProjectContext } from "@/contexts";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { set } from "zod";
import { Button } from "@/components/Button";
import { If } from "@/components/If";
import { permissionService } from "@/services";
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
  return (
    <div className="w-52 h-full shadow-blur-10 rounded-md flex flex-col relative pt-6 justify-between">
      <div className="px-4">
        <span className="flex flex-col">
          <select
            className="w-32 flex text-center h-8 border-primary judtify-center border-2 "
            onChange={(e) =>
              setProperty(properties.find((p) => p.id == +e.target.value))
            }
          >
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
        </span>
        {/*thats format the month to make the fisrt letter uppercase*/}
        <Calendar
          locale={locale}
          tileContent={tileContent}
          calendarType="gregory"
        />
      </div>
      <div
        className="w-full flex-col rounded-t-md shadow-blur-10 bg-primary 
                    dark:bg-secondary flex justify-start items-center absolute bottom-0 left-0"
      >
        <button
          className="w-min h-min whitespace-nowrap flex flex-col items-center"
          onClick={() => setOpenPermissions(!openPermissions)}
        >
          <h5 className=" h5 w-min  whitespace-nowrap flex-nowrap text-contrast pt-6">
            {t("access-level")}
          </h5>
          <p className="p w-min  whitespace-nowrap flex-nowrap text-contrast pb-6">
            {t("permissions-user-levels")}
          </p>
        </button>
        <AnimatePresence initial={false} mode="wait">
          {openPermissions && (
            <>
              <motion.div
                ref={ref}
                initial={{ height: "0vh" }}
                animate={{ height: "50vh" }}
                exit={{ transition: { delay: 0.5 }, height: "0vh" }}
                transition={{ duration: 0.5 }}
                className="overflow-y-clip"
              >
                <div className="h-4/5">
                  {permissions.map((permission, index) => (
                    <div key={index} className="flex justify-between">
                      <span>
                    <p>{permission.name}</p>
                    <If condition={project?.owner.id == user?.id}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </If>
                    </span>
                      
                    </div>
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
                    textSize="text-[16px]"
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
