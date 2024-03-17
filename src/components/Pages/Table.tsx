"use client";

import { Page, Project } from "@/models";
import { Table, TableOrList } from "./components";

interface Props {
  page: Page;
  project: Project;
}

export const TablePage = ({ page, project }: Props) => {
  return (
    <TableOrList name={page.name}>
      <Table page={page} updateIndex={() => console.log("Update Indexes")} />
    </TableOrList>
  );
};
