
"use client";
import { ProjectContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Loading } from "@/components/Loading";
import { Project } from "@/components/Project";

export default function Dashboard({ params }: { params: { project: number, user:string } }) {
  const { project } = useContext(ProjectContext);
  const {user} = useContext(UserContext);
  if(!project || !user) return <Loading/>;
  return <Project />
}
