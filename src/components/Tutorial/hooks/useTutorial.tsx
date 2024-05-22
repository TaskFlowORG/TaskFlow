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
        },{
          target: ".click-groups",
          disableBeacon: true,
          content: t("tuto-step-group-click"),
          placement: "right"
        },   
        {
          target: ".groups-side",
          disableBeacon: true,
          content: t("tuto-step5"),
          placement: "right"
        }, {
          target: ".create-group",
          disableBeacon: true,
          //ESSE NAO TEM AINDA
          content: t("tuto-step-group-create"),
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
        },{
          target: ".sidebar-button",
          disableBeacon: true,
          content: t("tuto-back-sidebar"),
        },{
          target: ".open-projects",
          disableBeacon: true,
          content: t("tuto-projects-page-open"),
        },
        {
          target: ".projects-page",
          disableBeacon: true,
          content: t("tuto-step7")
        },{
          target: ".create-project",
          disableBeacon: true,
          content: t("tuto-project-create"),
          placement: "left"
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
        },{
          target:".create-task", 
          disableBeacon: true,
          content: t("tuto-create-property"),
          placement: "left"
        },
        {
          target:".properties",
          disableBeacon: true,
          content: t("tuto-step13"),
          placement: "left"
        },{
          target: ".sidebar-button",
          disableBeacon: true,
          content: t("tuto-back-sidebar"),
        },{
          target: ".pages-button",
          disableBeacon: true,
          content: t("tuto-open-pages"),
        },
        {
          target: ".pages",
          disableBeacon: true,
          content: t("tuto-step14"),
          placement: "right"
        },
        {
          target: ".pages-create",
          disableBeacon: true,
          content: t("tuto-create-page"),
        },{
          target: ".create-page-final",
          disableBeacon: true,
          content: t("tuto-create-page-final"),
        },{
          target: ".created-page",
          disableBeacon: true,
          content: t("tuto-created-page"),
        },
        {
          target:".create-task", 
          disableBeacon: true,
          content: t("tuto-create-task"),
          placement: "left"
        },
        {
          target:".create-task-button", 
          disableBeacon: true,
          content: t("tuto-create-task-button"),
          placement: "left"
        },
        {
          target:".configs", 
          disableBeacon: true,
          content: t("tuto-step15"),
          placement: "left"
        },
      ] as Array<Step>
    }
}