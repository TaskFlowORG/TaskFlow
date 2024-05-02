import {
  Action,
  Log,
  Project,
  Property,
  Task,
  Option,
  TypeOfProperty,
  ArchiveValued,
  UserValued,
} from "@/models";
import { Interval } from "@/models/values/Interval";
import { useTranslation } from "react-i18next";

type LogProps = {
  log: Log;
  isInModal: boolean;
  item: Task | Project;
};

export const LogItem = ({ log, isInModal, item }: LogProps) => {
  const { t } = useTranslation();

  const dateFormat = (date: Date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano} - ${date.getHours()}:${date.getMinutes()}`;
  };

  const setValue = (property: Property, log: Log) => {
    switch (property.type) {
      case TypeOfProperty.CHECKBOX:
      case TypeOfProperty.TAG:
        return (log.value.value.value as Option[])
          .map((option, index) =>
            index == (log.value.value.value as Option[]).length + 1
              ? option.name + ", "
              : option.name
          )
          .concat();

      case TypeOfProperty.SELECT:
      case TypeOfProperty.RADIO:
        return (log.value.value.value as Option).name;
      case TypeOfProperty.ARCHIVE:
        return (log.value.value.value as ArchiveValued).archive?.name ?? "";
      case TypeOfProperty.TIME:
        return (
          (log.value.value.value as Interval).time.hours +
          ":" +
          (log.value.value.value as Interval).time.minutes +
          ":" +
          (log.value.value.value as Interval).time.seconds
        );
      case TypeOfProperty.USER:
        return (log.value.value.value as UserValued).users.map((user, index) =>
          index == (log.value.value.value as UserValued).users.length + 1
            ? user.username + ", "
            : user.username
        );
      case TypeOfProperty.DATE:
      case TypeOfProperty.NUMBER:
      case TypeOfProperty.PROGRESS:
      case TypeOfProperty.TEXT:
        return log.value.value.value;
    }

    return "Calma lá bicho";
  };

  console.log(log);

  // "log-update-task": "A propriedade '{{propertyname}}' da tarefa '{{taskname}}' foi atualizada para '{{propertyvalue}}' por '{{username}}'",
  // "log-update-project": "A propriedade '{{propertyname}}' do projeto '{{projectname}}' foi atualizada para '{{propertyvalue}}' por '{{username}}'",

  const getLogMessage = (): string => {
    switch (log.action) {
      case Action.COMPLETE:
        return t("log-complete-task", {
          username: log.user.username,
        });
      case Action.CREATE:
        return t(isInModal ? "log-create-task" : "log-create-project", {
          username: log.user.username,
        });
      case Action.DELETE:
        return t(isInModal ? "log-delete-task" : "");
      case Action.REDO:
        return t(isInModal ? "log-redo-task" : "", {
          username: log.user.username,
        });
      case Action.UPDATE:
        return t(isInModal ? "log-update-task" : "log-update-project", {
          propertyname: log.value.property.name,
          propertyvalue: setValue(log.value.property, log),
          username: log.user.username,
        });
      case Action.UPDATENAME:
        // Mano, é só fazer na tradução ser item name tá
        return t(
          isInModal ? "log-update-name-task" : "log-update-name-project",
          { username: log.user.username }
        );
      case Action.UPDATEDESCRIPTION:
        // Aqui eu preciso que o log tenha description, sem ele não é possível
        return t("log-description-project", {
          username: log.user.username,
        });
      case Action.UPDATEOWNER:
        return t("log-owner-project", { username: log.user.username });
      case Action.UPDATEPICTURE:
        return t("log-picture-project", { username: log.user.username });
    }
  };
  return (
    <div key={log.id} className="flex flex-col w-full gap-1 items-end relative">
      <p className="font-montserrat focus:font-semibold  text-p outline-none text-[#343434] text-end dark:text-[#f2f2f2]">
        {getLogMessage()}
      </p>
      <div className="h-[2px]  w-1/2 bg-[#D9D9D9]"></div>
      <p className="font-montserrat focus:font-semibold  text-mn outline-none text-[#343434] dark:text-[#f2f2f2]">
        {dateFormat(new Date(log.datetime))}
      </p>
    </div>
  );
};
