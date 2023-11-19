export const CalendarDay = ({ day, inThisMonth }) => {
    function compareDays(day1, day2) {
        return day1.getFullYear() == day2.getFullYear() && day1.getMonth() == day2.getMonth() && day1.getDate() == day2.getDate()
    }
    const dayClasses = inThisMonth
        ? " border-[1px] text-pink border-pink " + (compareDays(day, new Date()) ? "bg-pink bg-opacity-25" : "bg-white")
        : " bg-input-grey text-[rgba(0,0,0,0.25)] ";

    return (
            <div className={"aspect-square h-full pr-2 font-montserrat text-[32px] flex items-end justify-end rounded-md" + dayClasses}>
                {String(day.getDate()).padStart(2, "0")}
            </div>
    )
}