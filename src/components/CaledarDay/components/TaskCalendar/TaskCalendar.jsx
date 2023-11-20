
export const TaskCalendar = ({ task }) => {
    const color = task.color ? " bg-["+task.color+"] " : " bg-pink "
    return (
        <div title={task.name} className={ [`h-4 border-[1px] border-white -mx-1 aspect-square rounded-full ${color}`]}>
        </div>
    )

}