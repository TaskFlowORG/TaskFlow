"use client";
import { Log, Task, User } from "@/models";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
  Svg,
  Path,
  Defs,
  RadialGradient,
  Stop,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { ReactNode, useState } from "react";
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
});

// Componente para o cabeçalho
const Header = ({ user }: { user: User }) => (
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
      <Text>Relatório de Tarefas</Text>
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
const Footer = () => (
  <View style={styles.fotter} fixed>
    <Text>Rodapé do Documento PDF - Página </Text>
    <Text
      render={({ pageNumber, totalPages }) => `${pageNumber} de ${totalPages}`}
    />
  </View>
);

export const Report = ({ task, user }: { task: Task; user: User }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.all}>
          <Header user={user} />
          <Text style={styles.title}>Task #{task.id}</Text>
          <View style={styles.task}>
            {task.logs.map((log, index) => (
              <View style={styles.changes} key={index}>
                <View style={styles.action}>
                  <Text>
                    {log.action.charAt(0) +
                      log.action.slice(1).toLocaleLowerCase()}
                  </Text>
                  <Text>{new Date(log.datetime).toLocaleDateString()}</Text>
                </View>
                <Text>
                  {log.description} by {log.user.name + " " + log.user.surname}
                </Text>
              </View>
            ))}
          </View>
          <Footer />
        </View>
      </Page>
    </Document>
  );
};

export const ReportDowload = ({ task, user }: { task: Task; user: User }) => {
  return (
    <>
      <PDFDownloadLink
        fileName={`Task '#${task.id}' - By ${user.name} ${user.surname}.pdf`}
        document={<Report user={user} task={task} />}
      >
        Baixe aqui
      </PDFDownloadLink>
      <PDFViewer>
        <Report user={user} task={task} />
      </PDFViewer>
    </>
  );
};
