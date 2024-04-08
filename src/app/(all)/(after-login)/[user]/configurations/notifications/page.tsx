"use client"

import { NotificationsConfig } from "@/components/NotificationsConfig"
import { ConfigContext } from "@/utils";
import { useContext, useEffect } from "react";

export default function UserConfigPage() {
    const { setTitle } = useContext<any>(ConfigContext);
    useEffect(() => {
        setTitle('Notificações');
    }, []);

    return (

        <div className="h-full w-full">
            <NotificationsConfig></NotificationsConfig>
        </div>
    )
}