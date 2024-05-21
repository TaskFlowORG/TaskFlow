"use client"

import { PersonalInformations } from "@/components/PersonalInformations";
import { ConfigContext } from "@/utils";
import { useTranslation } from "next-i18next";
import { useContext, useEffect } from "react";

export default function UserConfigPage() {
    const { setTitle } = useContext<any>(ConfigContext);
    const { t } = useTranslation();	
    useEffect(() => {
        setTitle(t("personal-informations-side-bar"));
    }, []);

    return (
        <div className="w-full h-full">
            <PersonalInformations />      
        </div>
    );
}