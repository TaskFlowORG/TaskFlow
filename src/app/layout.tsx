

import type { Metadata } from "next";
import "@/styles/global.css";
export const metadata: Metadata = {
  title: "TaskFlow",
  description:
    "TaskFlow is a task manager that helps you organize your tasks and projects in a simple and intuitive way.",
    keywords: "task, task manager, taskflow, project, project manager",
   robots: "index, follow",
   abstract: "TaskFlow is a task manager that helps you organize your tasks and projects in a simple and intuitive way.",
   category: "Task Manager",
   creator: "TaskFlow", 
   generator: "TaskFlow"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="pt-br" className="w-screen h-screen">
    {children}
  </html>


}
