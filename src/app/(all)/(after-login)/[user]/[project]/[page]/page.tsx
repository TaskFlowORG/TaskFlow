"use client";
import {
  Calendar,
  Canvas,
  Kanban,
  List,
  Table,
  TimeLine,
} from "@/components/Pages";
import {
  CanvasPage,
  OrderedPage,
  Page,
  Project,
  TypeOfPage,
  User,
} from "@/models";
import { pageService, projectService, userService } from "@/services";
import { PageContext } from "@/utils/pageContext";
import { useContext, useEffect, useState } from "react";

export default function Pages({
  params,
}: {
  params: { user: string; project: number; page: number };
}) {
  const { setInPage, setPageId } = useContext(PageContext);
  const [page, setPage] = useState<Page>();
  const [project, setProject] = useState<Project>();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setInPage!(true);
    const getItems = async () => {
      setPage(await pageService.findOne(params.page));
      console.log(params.page)
      setProject(await projectService.findOne(params.project));
      setUser(await userService.findByUsername(params.user));
    };
    getItems();
    setPageId!(params.page);
  }, []);

  switch (page?.type) {
    case TypeOfPage.CALENDAR:
      return <Calendar page={page as OrderedPage} />;
    case TypeOfPage.KANBAN:
      return <Kanban user={user!} />;
    case TypeOfPage.LIST:
      return <List page={page} />;
    case TypeOfPage.TABLE:
      return <Table page={page} project={project!} />;
    case TypeOfPage.TIMELINE:
      return <TimeLine />;
    case TypeOfPage.CANVAS:
      return <Canvas page={page as CanvasPage} user={user!} />;
  }
}
