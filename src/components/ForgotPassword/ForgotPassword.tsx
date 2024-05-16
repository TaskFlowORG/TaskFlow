"use client"

import { useState } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

export const ForgotPassword = () => {
    const [step, setStep] = useState(1);

    return (
        <>
            <div className="flex h-full w-full absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
                <div className="h-full w-full shadow-blur-10 rounded-md bg-white dark:bg-modal-grey flex flex-col justify-center items-center">
                    {step === 1 && <Step1 setStep={setStep} />}
                    {step === 2 && <Step2 setStep={setStep} />}
                    {step === 3 && <Step3 />}
                </div>
            </div>
        </>
    );
};
