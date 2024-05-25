"use client"

import { NotificationsConfig } from "@/components/NotificationsConfig"
import { ConfigContext } from "@/utils";
import { useTranslation } from "next-i18next";
import { useContext, useEffect } from "react";

export default function UserConfigPage() {
    const { setTitle } = useContext<any>(ConfigContext);
    const { t } = useTranslation();	
    useEffect(() => {
        setTitle("notifications-side-bar");
    }, []);

    return (

        <div className="h-full w-full">
            <NotificationsConfig></NotificationsConfig>
        </div>
    )
}