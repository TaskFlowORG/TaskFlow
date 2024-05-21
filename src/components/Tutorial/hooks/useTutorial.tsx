import { useTranslation } from "react-i18next";
import { Step } from "react-joyride";

export const useTutorial = () => {
    const {t} = useTranslation();
    return {
      steps: [
        {
          target: ".initial-page",
          disableBeacon: true,
          content: t("tuto-step1"),
          
        },
        {
          target: ".header",
          disableBeacon: true,
          content: t("tuto-step2")
        },
        {
          target: ".sidebar-button",
          disableBeacon: true,
          content: t("tuto-step3"),
        },
        {
          target: ".sidebar",
          disableBeacon: true,
          content: t("tuto-step4"),
          placement: "right"
        },
        {
          target: ".groups-side",
          disableBeacon: true,
          content: t("tuto-step5"),
          placement: "right"
        },    
        {
          target: ".group-page",
          disableBeacon: true,
          content: t("tuto-step6")
        },
        {
          target:".search-user", 
          disableBeacon: true,
          content: t("tuto-step16")
        },
        {
          target:".add-user",
          disableBeacon: true,
          content: t("tuto-step17")
        },
        {
          target: ".projects-page",
          disableBeacon: true,
          content: t("tuto-step7")
        },
        {
          target: ".project-page",
          disableBeacon: true,
          content: t("tuto-step8")
        },
        {
          target: ".dashboard-button",
          disableBeacon: true,
          content: t("tuto-step9"),
          placement: "left"

        },
        {
          target: ".historical",
          disableBeacon: true,
          content: t("tuto-step10")
        },
        {
          target: ".comments",
          disableBeacon: true,
          content: t("tuto-step11")
        },
        {
          target: ".properties-section",
          disableBeacon: true,
          content: t("tuto-step12")
        },
        {
          target:".properties",
          disableBeacon: true,
          content: t("tuto-step13"),
          placement: "left"
        },
        {
          target: ".pages",
          disableBeacon: true,
          content: t("tuto-step14"),
          placement: "right"
        },
        {
          target:".create-task", 
          disableBeacon: true,
          content: t("tuto-create-task")
        },
        {
          target:".configs", 
          disableBeacon: true,
          content: t("tuto-step15")
        },
      ] as Array<Step>
    }
}