import { useTranslation } from "react-i18next";

export const useTutorial = () => {
    const {t} = useTranslation();
    return {
      steps: [
        {
          target: ".initial-page",
          disableBeacon: true,
          content: t("tuto-step1")
        },
        {
          target: ".header",
          disableBeacon: true,
          content: t("tuto-step2")
        },
        {
          target: ".sidebar-button",
          disableBeacon: true,
          content: t("tuto-step3")
        },
        {
          target: ".sidebar",
          disableBeacon: true,
          content: t("tuto-step4")
        },
        {
          target: ".groups-side",
          disableBeacon: true,
          content: t("tuto-step5")
        },    
        {
          target: ".group-page",
          disableBeacon: true,
          content: t("tuto-step6")
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
          content: t("tuto-step9")
        },
        {
          target: ".logs-section",
          disableBeacon: true,
          content: t("tuto-step10")
        },
        {
          target: ".comments-section",
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
          content: t("tuto-step13")
        },
        {
          target: ".pages",
          disableBeacon: true,
          content: t("tuto-step14")
        },
        {
          target:".configs", 
          disableBeacon: true,
          content: t("tuto-step15")
        }
      ]
    }
}