"use client";

import { Project } from "@/models";
import React, { useState } from "react";
import { If } from "../If";
import { Button } from "../Button";
import { SideMain } from "./components";
import { CenterModal, SideModal } from "../Modal";
import { ProjectInformations } from "./components/ProjectInformations";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { authentication } from "@/services/services/Authentication";
import { SideBarButton } from "./components/SideBarButton";
import { setConfigsDefault } from "@/utils/setConfigsDefault";
interface Props {
  user: string;
  project?: Project;
  setOpenSideBar: (value: boolean) => void;
  openSideBar: boolean;
}
export const SideBarProjects = ({ user, project, setOpenSideBar, openSideBar }: Props) => {
  const router = useRouter();
  const [modalPages, setModalPages] = useState(false);
  const [modalGroups, setModalGroups] = useState(false);
  const [modalProjectGroups, setModalProjectGroups] = useState(false);
  const [wantLeave, setWantLeave] = useState(false);
  const { t } = useTranslation();

  const leave = async () => {
    await authentication.logout();
    setConfigsDefault();
    router.push("/login");
  };
  return (
    <SideModal condition={openSideBar} setCondition={setOpenSideBar} header={
      <If condition={project != undefined}>
      <ProjectInformations project={project} />
    </If>
    }>

    <div className="w-full h-full sidebar">
   
      <SideMain
        setModalGroups={setModalGroups}
        setWantLeave={setWantLeave}
        modalGroups={modalGroups}
        setModalPages={setModalPages}
        modalPages={modalPages}
        setModalProjectGroups={setModalProjectGroups}
        modalProjectGroups={modalProjectGroups}
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
    </div>
    </SideModal>
  );
};
