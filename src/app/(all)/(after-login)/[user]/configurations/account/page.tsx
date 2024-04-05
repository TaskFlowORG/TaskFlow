"use client"

import { PersonalInformations } from "@/components/PersonalInformations";
import { ConfigContext } from "@/utils";
import { useContext, useEffect } from "react";

export default function UserConfigPage() {
    const { setTitle } = useContext<any>(ConfigContext);
    useEffect(() => {
        setTitle('Informações pessoais');
    }, []);

    return (
        <div className="h-[60%] w-full flex items-center">
            <PersonalInformations />
            
        </div>
    );
}