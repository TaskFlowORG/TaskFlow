import { steps } from "@/utils/tutorial"
import Joyride from "react-joyride";

import { Loading } from "../Loading";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";

export const Tutorial = () => {
    const [step, setStep] = useState(0);
    const { user } = useContext(UserContext);

    const handleJoyrideCallback = (data: any) => {
        setStep(prev => prev + 1);
    };

    useEffect(() => {
        setStep(0); // Reset the step when the user changes
    }, [user]);

    if (!user) return <Loading />
    return (
        <Joyride
            showSkipButton
            steps={steps.steps}
            stepIndex={step}
            callback={handleJoyrideCallback}
        />
    )
}