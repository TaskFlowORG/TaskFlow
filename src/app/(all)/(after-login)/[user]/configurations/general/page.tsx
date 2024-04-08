"use client"

import { GeneralConfig } from "@/components/GeneralConfig"
import { ConfigContext } from "@/utils";
import Head from "next/head";
import { useContext, useEffect } from "react";

export default function UserConfigPage() {
  const { setTitle } = useContext<any>(ConfigContext);
  useEffect(() => {
    setTitle('Configurações');
  }, []);
  return (
    <div className="h-full w-full">
      <GeneralConfig />
    </div>
  )
}