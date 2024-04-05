
"use client";
import { ProjectContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { Report } from "@/components/Report";
import { PDFDownloadLink, PDFRenderer, PDFViewer, pdf } from "@react-pdf/renderer";
import { User } from "@/models";
import { userService } from "@/services";
import { ReportDowload } from "@/components/Report/Report";

export default function Dashboard({ params }: { params: { project: number, user:string } }) {
  const { project } = useContext(ProjectContext);
  const [user, setUser ] = useState<User>();
    useEffect(() => {
        (async () => {
            const user = await userService.findLogged();
            setUser(user);
        })();
    }, []);
  if(!project || !user) return null;
  return (
    <div>
      <h1 className="mt-14">Dashboard</h1>
       <ReportDowload user={user} task={project.pages[0].tasks[0].task} />
    </div>
  );
}
