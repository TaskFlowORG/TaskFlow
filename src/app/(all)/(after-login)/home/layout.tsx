"use client";

import { Header } from "@/components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import { useContrast } from "@/hooks/useContrast";
import { Project, ProjectSimple, Task, Theme } from "@/models";
import { SideBarProjects } from "@/components/SideBarProjects";
import { ProjectContext, ProjectsContext } from "@/contexts";
import { SideModal } from "@/components/Modal";
import { projectService, userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { useTheme } from "next-themes";
import { Loading } from "@/components/Loading";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { PageContext } from "@/utils/pageContext";
import { generateContrast } from "@/functions";
import { Tutorial } from "@/components/Tutorial";
import Joyride from "react-joyride";
import { LanguageContext } from "@/contexts/ContextLanguage";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { TutorialContext } from "@/contexts/TutorialContext";
//UseClickAway Hook
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project: number };
}) {
  const [project, setProject] = useState<Project>();
  const [projects, setProjects] = useState<ProjectSimple[]>([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [tutorialIsMaded, setTutorialIsMaded] = useState<boolean | undefined>(
    false
  );
  const ref = useRef<HTMLDivElement>(null);
  const { setTheme, theme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [pageId, setPageId] = useState<number>();
  const [inPage, setInPage] = useState(false);
  const [task, setSelectedTask] = useState<Task>();
  const [isOpen, setIsOpen] = useState(false);
  const { contrastColor } = useContrast();
  const [step, setStep] = useState<number | undefined>(0);
  const asynThrow = useAsyncThrow();

  const { changeLanguage } = useContext(LanguageContext);
  useEffect(() => {
    (async () => {
      if (!user) return;
      setTheme(user.configuration.theme.toLowerCase());
      document.documentElement.style.setProperty(
        "--primary-color",
        user.configuration.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        user.configuration.secondaryColor
      );
      document.documentElement.style.setProperty(
        "--contrast-color",
        generateContrast(
          theme == "light"
            ? user.configuration.primaryColor
            : user.configuration.secondaryColor
        )
      );
      document.documentElement.style.setProperty(
        "--font-size-h1",
        `${3.5 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-h2",
        `${3 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-h3",
        `${2 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-h4",
        `${1.5 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-h5",
        `${1.25 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-p",
        `${user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-p14",
        `${0.875 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-mn",
        `${0.75 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--font-size-mnAlata",
        `${0.75 * user.configuration.fontSize}px`
      );
      document.documentElement.style.setProperty(
        "--common-font",
        user.configuration.font
      );
      setTutorialIsMaded(user.configuration.isTutorialMade);
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!user || !setUser) return;
      user.configuration.theme =
        Theme[theme?.toUpperCase() as keyof typeof Theme];
      const userTemp = await userService.update(user).catch(asynThrow);
      if (!userTemp) return;
      setUser(userTemp);
    })();
  }, [theme]);


  useEffect(() => {
    (async () => {
      const projectsT = await projectService.findAllOfAUser().catch(asynThrow);
      if (!projectsT) return;
      setProjects(projectsT);
    })();
  }, [user]);

  useEffect(() => {
    if (!project) return;
    projectService.setVisualizedNow(project.id);
  }, [project]);

  useEffect(() => {
    (async () => {
      if (!setUser) return;
      const loggedUser = await userService.findLogged().catch(asynThrow);
      if (!loggedUser) return;
      changeLanguage(loggedUser.configuration.language);
      setUser(loggedUser);
    })();
  }, []);

  if (!user) return <Loading />;
  //FICOU POR
  return (
    <>
      <ProjectsContext.Provider value={{ projects, setProjects }}>
        <ProjectContext.Provider value={{ project, setProject }}>
          <PageContext.Provider
            value={{ inPage, setInPage, pageId, setPageId }}
          >
            <TaskModalContext.Provider
              value={{ isOpen, setIsOpen, task, setSelectedTask }}
            >
              <TutorialContext.Provider
                value={{
                  isTutorialMade: tutorialIsMaded,
                  setIsTutorialMade: (value) => setTutorialIsMaded(value),
                  step, setStep
                }}
              >
                <Tutorial />

                <Header setSidebarOpen={setOpenSideBar}></Header>
                <main className="w-screen   h-screen flex flex-col items-center justify-start">
                  <SideBarProjects
                    user={user.username}
                    project={project}
                    setOpenSideBar={setOpenSideBar}
                    openSideBar={openSideBar}
                  />
                  {children}
                </main>
              </TutorialContext.Provider>
            </TaskModalContext.Provider>
          </PageContext.Provider>
        </ProjectContext.Provider>
      </ProjectsContext.Provider>
    </>
  );
}
