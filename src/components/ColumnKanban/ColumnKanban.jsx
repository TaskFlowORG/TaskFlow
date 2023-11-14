'use client';

import { RoundedCard } from "@/components/RoundedCard/RoundedCard"
import { useEffect, useState } from "react";

export const ColumnKanban = ({color, columnName}) => {

  const [colorUse, setColorUse] = useState("");

  useEffect(() => {
    setColorUse(color)
  }, [color])
return (
    <div className="w-min flex flex-col gap-4  brightness-[0.95] hover:brightness-[1]">
    <div className="flex gap-6 items-center">
      <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: color}}></div>
      <h4>{columnName}</h4>
    </div>
    <RoundedCard color={color} />
    <RoundedCard color={color} />


  </div>
)
}