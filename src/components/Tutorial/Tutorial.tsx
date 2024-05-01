
import Joyride, { CallBackProps } from "react-joyride";

import { Loading } from "../Loading";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { set } from "react-hook-form";
import ReactJoyride from "react-joyride";
import { useTheme } from "next-themes";
import { useTutorial } from "./hooks/useTutorial";
import { userService } from "@/services";
import { useTranslation } from "react-i18next";

export const Tutorial = () => {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(false);
  const { user , setUser} = useContext(UserContext);
  const {theme} = useTheme();
  const steps = useTutorial();
  const {t} = useTranslation();

  useEffect(() => {
    if (!user) return;
    setStep(0);
    setRun(!user.configuration.isTutorialMade);
  }, [user]);

  const endTutorial = async () => {
    setRun(false);
    if(user && setUser) {
      user.configuration.isTutorialMade = true;
      const updated = await userService.update(user);
      setUser(updated);
    }
  }



  const handleJoyrideCallback = (data: CallBackProps) => {
    if(!user) return;
    const target = document.querySelector(data.step.target as string);
    const {action, index, status, type, lifecycle} = data;
    console.log("target", target, type)
    if((type == "error:target_not_found" || type == "tour:start") && !target) {
      setRun(false);
      setTimeout(() => {
        setRun(true);
        handleJoyrideCallback(data)
      }, 1000);
    }else{
        if(action === "next" && lifecycle == "complete") setStep(index + 1);
        if(action === "prev" && lifecycle == "complete") setStep(index - 1);
        if( status == "finished" || status == "skipped") endTutorial();
    }

  }
   


  return (

    <Joyride
      showSkipButton
      steps={steps.steps}
      stepIndex={step}
      hideCloseButton
      disableOverlayClose
      callback={data => handleJoyrideCallback(data)}
      disableCloseOnEsc
      run={run}
      continuous
      locale={
        {
          back: t("back"),
          close: t("close"),
          last: t("end"),
          next: t("next"),
          skip: t("skip"),
        }
      }
      styles={{
        options: {
          primaryColor: theme == "light" ? "var(--primary-color)" : "var(--secondary-color)", 
          overlayColor: theme == "light" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.5)",
          textColor: theme == "light" ? "#3c3c3c" : "#fcfcfc",
          backgroundColor: theme == "light" ? "#fcfcfc" : "#3c3c3c",
          zIndex: 1000,
        },
        buttonNext:{
          color: "var(--contrast-color)",
        }

      }}
      
    />
  );
};
