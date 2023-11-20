
export const TaskCalendar = ({ task }) => {
    const style = { backgroundColor: task.color ? task.color : "#F04A94" }
    return (
        <div title={task.name} className={`h-6 border-[1px] border-white -mx-1 aspect-square rounded-full`} style={style}>
        </div>
    )

}