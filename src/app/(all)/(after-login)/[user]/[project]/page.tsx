
"use client";
import { ProjectContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Loading } from "@/components/Loading";
import { Project } from "@/components/Project";
import { PageContext } from "@/utils/pageContext";

export default function Dashboard({ params }: { params: { project: number, user:string } }) {
  const { project } = useContext(ProjectContext);
  const {user} = useContext(UserContext);
  const {setPageId, setInPage} = useContext(PageContext);
  
  useEffect(() => {
    if(!setInPage || !setPageId) return;
    setInPage(false);
    setPageId(0);
  }, []);
  if(!project || !user) return <Loading/>;
//FICOU ASSIM 
  return <Project />
}
