
"use client";
import { ProjectContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function Dashboard({ params }: { params: { project: number, user:string } }) {
  const { project } = useContext(ProjectContext);
  const {user} = useContext(UserContext);
  if(!project || !user) return null;
  return (
    <div>
      <h1 className="mt-14">Dashboard</h1>
    </div>
  );
}
