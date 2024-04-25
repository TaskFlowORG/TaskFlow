"use client";

import { Loading } from "@/components/Loading";
import { Page } from "@/components/Pages";
import { showTask } from "@/components/Pages/functions";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import {
  Page as PageModel,
  TaskPage,
  TypeOfPage,
} from "@/models";
import { FilteredProperty } from "@/types/FilteredProperty";
import { FilterContext } from "@/utils/FilterlistContext";
import { PageContext } from "@/utils/pageContext";
import { filterProps } from "framer-motion";
import { useContext, useEffect, useState } from "react";

export default function Pages({
  params,
}: {
  params: { user: string; project: number; page: number };
}) {
  const { project } = useContext(ProjectContext);
  const [page, setPage] = useState<PageModel | undefined>(
    project?.pages.find((p) => p.id == params.page)
  );
  const { user } = useContext(UserContext);
  const { setPageId, setInPage } = useContext(PageContext);
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [input, setInput] = useState("");
  const [list, setList] = useState<FilteredProperty>();
  const [tasks, setTasks] = useState<TaskPage[]>();

  useEffect(() => {
    const pageTemp = project?.pages.find((p) => p.id == params.page);
    setPage(pageTemp);
    console.log(pageTemp);
    if (!pageTemp || !setInPage || !setPageId) return;
    setPageId(pageTemp?.id);
    setInPage(pageTemp.type != TypeOfPage.LIST);
    setTasks(pageTemp.tasks);
    
  }, [params.page, project, project?.pages]);

  if (!user) return <Loading />;
  if (!page)
    return <Loading />;
  

    return (
      <FilterContext.Provider
        value={{
          filterProp: filter,
          setFilterProp: setFilter,
          list,
          setList: setList,
          input,
          setInput: setInput,
        }}
      >
        <Page page={page} user={user} project={project} setPage={setPage} tasks={tasks ?? []} />

      </FilterContext.Provider>
    )
}
