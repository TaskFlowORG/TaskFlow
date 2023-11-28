
export const TaskCalendar = ({ task }) => {
    const style = { backgroundColor: task.color ? task.color : "#F04A94" }
    return (
        <div title={task.name} className={`h-3 sm:h-4 lg:h-4 3xl:h-5 -mx-[2px] xl:-mx-1 border-[1px] border-white aspect-square rounded-full`} style={style}>
        </div>
    )

}