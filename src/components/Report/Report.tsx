"use client";
import {
  Action,
  Archive,
  ArchiveValued,
  Log,
  Option,
  Project,
  Property,
  Task,
  TypeOfProperty,
  User,
  UserValued,
} from "@/models";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { log } from "console";
import { ReactNode, useEffect, useState } from "react";
import { compareDates } from "../Pages/functions";
import { Index } from "@syncfusion/ej2-react-charts";
import { useTranslation } from "react-i18next";
import { Interval } from "@/models/values/Interval";
import { TFunction } from "i18next";
Font.register({
  family: "Montserrat",
  src: "/fonts/Montserrat/static/Montserrat-Regular.ttf",
});
Font.register({ family: "Alata", src: "/fonts/Alata/Alata-Regular.ttf" });
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FCFCFC",
    paddingTop: "3cm",
    paddingLeft: "3cm",
    paddingBottom: "2cm",
    paddingRight: "2cm",
    fontFamily: "Montserrat",
    color: "#3C3C3C",
    fontSize: 12,
  },
  all: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  fotter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    textAlign: "center",
  },
  title: {
    marginTop: 80,
    width: "100%",
    fontFamily: "Alata",
    textAlign: "center",
    fontSize: 20,
  },
  task: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: 2,
    width: "100%",
    borderColor: "#F04A94",
    fontSize: 16,
  },
  changes: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
  },
  properties: {},
  logo: {
    width: 50,
    height: 50,
  },
  descriptionlog: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Componente para o cabeçalho
const Header = ({
  user,
  t,
  isInProject,
}: {
  user: User;
  t: TFunction;
  isInProject?: boolean;
}) => (
  <View style={styles.header} fixed>
    <View style={{ width: "20%" }}>
      <Image src={"/LogoTaskFlow.png"} style={styles.logo} />
    </View>
    <View
      style={{
        width: "60%",
        textAlign: "left",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Text>TaskFlow</Text>
      <Text>{isInProject ? t("project-report") : t("task-report")}</Text>
      <Text>{user.name + " " + user.surname}</Text>
    </View>
    <View
      style={{
        height: "100%",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "20%",
      }}
    >
      <Text>{new Date().toLocaleTimeString()}</Text>
      <Text>{new Date().toLocaleDateString()}</Text>
    </View>
  </View>
);

// Componente para o rodapé
const Footer = ({ t }: { t: TFunction }) => (
  <View style={styles.fotter} fixed>
    <Text>{t("footer-report")}</Text>
    <Text
      render={({ pageNumber, totalPages }) =>
        `${pageNumber} ${t("of")} ${totalPages}`
      }
    />
  </View>
);

type GroupedLog = {
  logs: DescriptionLog[];
  date: Date;
};
type DescriptionLog = Log & { description: string };

export const Report = ({
  logged,
  user,
  isInProject,
}: {
  logged: Task | Project;
  user: User;
  isInProject?: boolean;
}) => {
  const [groupped, setGroupped] = useState<GroupedLog[]>([]);
  const { t } = useTranslation();

  const dateFormat = (date: Date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
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
        return (log.value.value.value as Archive).name;
      case TypeOfProperty.TIME:
        let duration = (log.value.value.value as Interval).time;
        return (
          (duration.hours < 10 ? "0" + duration.hours : "" + duration.hours) +
          ":" +
          (duration.minutes < 10
            ? "0" + duration.minutes
            : "" + duration.minutes) +
          ":" +
          (duration.seconds < 10
            ? "0" + duration.seconds
            : "" + duration.seconds)
        );
      case TypeOfProperty.USER:
        return (log.value.value as UserValued).users?.map((user, index) =>
          index == (log.value.value.value as UserValued).users.length + 1
            ? user.username + ", "
            : user.username
        );
      case TypeOfProperty.DATE:
        return dateFormat(new Date(log.value.value.value as string));
      case TypeOfProperty.NUMBER:
      case TypeOfProperty.TEXT:
        return log.value.value.value;
      case TypeOfProperty.PROGRESS:
        return (log.value.value.value as number) + "%";
    }
  };
  const getLogMessage = (log: Log): string => {
    switch (log.action) {
      case Action.COMPLETE:
        return t("log-complete-task", {
          username: log.user.username,
        });
      case Action.CREATE:
        return t(!isInProject ? "log-create-task" : "log-create-project", {
          username: log.user.username,
        });
      case Action.DELETE:
        return t(!isInProject ? "log-delete-task" : "");
      case Action.REDO:
        return t(!isInProject ? "log-redo-task" : "", {
          username: log.user.username,
        });
      case Action.UPDATE:
        return t(!isInProject ? "log-update-task" : "log-update-project", {
          propertyname: log.value.property.name,
          propertyvalue: setValue(log.value.property, log),
          username: log.user.username,
        });
      case Action.UPDATENAME:
        // Mano, é só fazer na tradução ser item name tá
        return t(
          !isInProject ? "log-update-name-task" : "log-update-name-project",
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

  const groupLogs = () => {
    const logs: GroupedLog[] = [];
    logged.logs?.forEach((log) => {
      const date = new Date(log.datetime);
      if (logs.some((group) => compareDates(date, new Date(group.date)))) {
        logs
          .find((group) => compareDates(date, new Date(group.date)))
          ?.logs.push({ ...log, description: getLogMessage(log) });
      } else {
        logs.push({
          date,
          logs: [{ ...log, description: getLogMessage(log) }],
        });
      }
    });
    setGroupped(logs);
  };

  useEffect(() => {
    groupLogs();
  }, [logged]);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.all}>
          <Header user={user} t={t} isInProject={isInProject} />
          <Text style={styles.title}>
            {isInProject ? t("project") : t("task")} #{logged.id}
          </Text>
          <View style={styles.task}>
            {groupped.map((log, index) => (
              <View style={styles.changes} key={index}>
                <View style={styles.action}>
                  <Text>{log.date.toLocaleDateString()}</Text>
                </View>
                <Text style={styles.descriptionlog}>
                  {log.logs?.map((log, index) => (
                    <View key={index} style={styles.descriptionlog}>
                      <Text>
                        {new Date(log.datetime).toLocaleTimeString() + "  "}
                      </Text>
                      <Text>
                        {t(log.action.toLowerCase()) + " - " + log.description}
                      </Text>
                    </View>
                  ))}
                </Text>
              </View>
            ))}
          </View>
          <Footer t={t} />
        </View>
      </Page>
    </Document>
  );
};

export const ReportDowload = ({
  logged,
  user,
}: {
  logged: Task | Project;
  user: User;
}) => {
  return (
    <>
      <PDFDownloadLink
        fileName={`'#${logged.id}' - By ${user.name} ${user.surname}.pdf`}
        document={<Report user={user} logged={logged} />}
      >
        Baixe aqui
      </PDFDownloadLink>
      <PDFViewer className="fixed h-screen py-10 w-auto">
        <Report user={user} logged={logged} isInProject />
      </PDFViewer>
    </>
  );
};
