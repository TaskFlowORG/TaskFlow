"use client";

import { List, TableOrList } from "./components";
import { useEffect, useState } from "react";
import { Page, TaskOrdered, TaskPage } from "@/models";
import { pageService } from "@/services";

interface Props {
  page: Page;
}

export const ListPage = ({ page }: Props) => {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    (async () => {
      const pagesPromise: Page[] = await pageService.findAll();
      let tasksPromise = page.tasks;
      const list = [];
      for (let p of pagesPromise) {
        for (let task of p.tasks) {
          if (
            task.task.id == tasksPromise[0]?.task.id &&
            page.id != p.id &&
            list.find((p1) => p1.id == p.id) == undefined
          ) {
            list.push(p);
          }
        }
      }
      setPages(list);
    })();
    // eslint-disable-next-line
  }, []);

  function contains(t: TaskPage): boolean {
    if (!page) return false;
    for (let task of page.tasks) {
      if (task.task.id == t.task.id) return true;
    }
    return false;
  }

  return (
    <TableOrList name={page.name}>
      {pages.map((p) => {
        return (
          <List
            key={p.id}
            list={(p?.tasks.filter((t) => contains(t)) as TaskOrdered[]) ?? []}
            page={p}
          />
        );
      })}
    </TableOrList>
  );
};
