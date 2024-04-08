"use client"

import { GeneralConfig } from "@/components/GeneralConfig"
import { ConfigContext } from "@/utils";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useContext, useEffect } from "react";

export default function UserConfigPage() {
  const { setTitle } = useContext<any>(ConfigContext);
  const { t } = useTranslation();	
  useEffect(() => {
    setTitle(t("configurations"));
  }, []);
  return (
    <div className="flex items-center justify-center h-full w-full">
      <GeneralConfig />
    </div>
  )
}