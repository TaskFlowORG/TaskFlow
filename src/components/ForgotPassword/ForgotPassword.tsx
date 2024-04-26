"use client"

import { useState } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

interface Props {
    stepNumber: number
}

export const ForgotPassword = ({ stepNumber }: Props) => {
    const [step, setStep] = useState(1);

    return (
        <>
            <div className="flex h-5/6 w-screen absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">

                {step === 1 && <Step1 setStep={setStep} />}
                {step === 2 && <Step2 setStep={setStep} />}
                {step === 3 && <Step3 />}

            </div>
        </>
    );
};
