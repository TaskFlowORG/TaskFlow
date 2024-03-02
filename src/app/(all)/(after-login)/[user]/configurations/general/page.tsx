'use client'

import { GeneralConfig } from "@/components/GeneralConfig"
import { SideBarConfig } from "@/components/SideBarConfig"
import { calculateOverrideValues } from "next/dist/server/font-utils";
import { useState } from "react";

export default function UserConfigPage() {
  return(
    <div className="flex h-full w-full">
      <GeneralConfig />
    </div>
  )
}