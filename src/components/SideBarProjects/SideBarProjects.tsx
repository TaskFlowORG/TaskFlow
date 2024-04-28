"use client";

import { Project } from "@/models";
import React, { useState } from "react";
import { If } from "../If";
import { Button } from "../Button";
import { SideMain } from "./components";
import { CenterModal } from "../Modal";
import { ProjectInformations } from "./components/ProjectInformations";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";

interface Props {
  user: string;
  project?: Project;
}
export const SideBarProjects = ({ user, project }: Props) => {
  const router = useRouter();
  const [modalPages, setModalPages] = useState(false);
  const [modalGroups, setModalGroups] = useState(false);
  const [modalProjectGroups, setModalProjectGroups] = useState(false);
  const [wantLeave, setWantLeave] = useState(false);
  const { t } = useTranslation();
  const leave = () => {
    Cookies.remove("JWT");
    router.push("/login");
  };
  return (
    <>
      <If condition={project != undefined}>
        <ProjectInformations project={project} />
        {//<div className="w-full h-16 flex items-center brightness-0 opacity-80 dark:invert justify-start gap-4">
        //  <img
        //    src="/Assets/logo/IconLight.svg"
        //    alt="logo"
        //    className="w-20 h-20"
        //  />
        //  <div>
        //    <p className="text-h4 font-alata text-primary dark:text-secondary truncate">
        //      Task Flow
        //    </p>
        //  </div>
        //</div>
      }
      </If>
      <SideMain
        setModalGroups={setModalGroups}
        modalGroups={modalGroups}
        setModalPages={setModalPages}
        modalPages={modalPages}
        setModalProjectGroups={setModalProjectGroups}
        modalProjectGroups={modalProjectGroups}
        setWantLeave={setWantLeave}
        user={user}
        project={project}
      />

      <CenterModal stylesTailwind="w-96" condition={wantLeave} setCondition={setWantLeave}>
        <div className="w-full h-min py-6 gap-6 flex flex-col items-center justify-around">
          <h4 className="text-h4 font-alata text-primary  dark:text-secondary flex-wrap w-3/4 text-center">
            {t("want-leave")}
          </h4>
          <div className="w-3/4 flex justify-between">
            <Button
              width="w-min"
              text={t("cancel")}
              
              padding="p-2" paddingY="py-2" textSize="font-p"
              fnButton={() => setWantLeave(false)}
            />
            <Button width="w-min" 
            padding="p-2" paddingY="py-2" textSize="font-p"
            fnButton={leave} secondary />
          </div>
        </div>
      </CenterModal>
    </>
  );
};
