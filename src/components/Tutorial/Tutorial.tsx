import { steps } from "@/utils/tutorial";
import Joyride, { CallBackProps } from "react-joyride";

import { Loading } from "../Loading";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { set } from "react-hook-form";
import ReactJoyride from "react-joyride";

export const Tutorial = () => {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    setStep(0);
    setRun(!user.configuration.isTutorialMade);
  }, [user]);

  if (!user) return <Loading />;
  const handleJoyrideCallback = (data: CallBackProps) => {
    const {action, index, status, type} = data;
    console.log(data);
    if(type === "error:target_not_found") setTimeout(() => handleJoyrideCallback(data), 1000);
    switch (action) {
      case "skip":
        user.configuration.isTutorialMade = true;
        setRun(false);
        break;
      case "next":
        setStep(1);
        break;
      case "prev":
        setStep(1);
        break;
      case "reset":
        setStep(0);
        setRun(true);
        break;
      case "close":
        user.configuration.isTutorialMade = true;
        setRun(false);
        break;
      case "stop":
        user.configuration.isTutorialMade = true;
        setRun(false);
        break;
      case "update":
        setRun(true);
        break;
      case "go":
        setStep(index);
        setRun(true);
        break;
      case "start":
        setRun(true);
        break;
    }

    switch (status) {
        case "finished":
            user.configuration.isTutorialMade = true;
            setRun(false);
            break;
        case "skipped":
            user.configuration.isTutorialMade = true;
            setRun(false);
            break;
        case "error":
            user.configuration.isTutorialMade = true;
            setRun(false);
            break;
        case "idle":
            console.log("idle")
            break;
        case "ready":
            console.log("ready")
            break;
        case "running":
            console.log("running")
            break;
        case "paused":
            console.log("paused")
            break;
        case "waiting":
            console.log("waiting")
            break; 
    }

  };
  return (
    <Joyride
    //   showSkipButton
     
      steps={steps.steps}
      
    //   stepIndex={step}
    //   hideCloseButton
      
      
    //   disableOverlayClose
    //   callback={handleJoyrideCallback}
    //   run={run}
      
    />
  );
};
