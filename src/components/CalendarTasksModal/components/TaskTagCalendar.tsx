import { Task, TaskPage } from "@/models"

export const TaskTagCalendar = ({t}:{t:TaskPage}) => {
    return <div key={t.task.id} className="bg-primary dark:bg-secondary text-contrast w-max h-min p py-2 px-4 rounded-md" >
    <span className="w-max h-min whitespace-nowrap " style={{ opacity: t.task.name ? 1 : 0.7 }}>
        {t.task.name ?? "Sem Nome"}
    </span>
    </div>
}