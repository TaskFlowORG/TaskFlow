export const CalendarDay = ({ day, inThisMonth }) => {
function compareDays(day1, day2) {
    return day1.getFullYear() == day2.getFullYear() && day1.getMonth() == day2.getMonth() && day1.getDate() == day2.getDate()
}

    if(inThisMonth) {
        return (
            <div className={` w-full h-full px-2 text-pink font-montserrat text-[32px] grid-row-span: 5; flex items-end justify-end rounded-md 
            border-[1px] border-pink ` + (compareDays(day, new Date()) ? "bg-pink bg-opacity-25" :"bg-white")}>
                {String(day.getDate()).padStart(2, "0")}
            </div>
            )
    }else{
        return (
            <div className=" w-full h-full px-2 text-[rgba(0,0,0,0.25)] grid-row-span: 5; font-montserrat text-[32px] flex items-end justify-end rounded-md  bg-input-grey">
                {String(day.getDate()).padStart(2, "0")}
            </div>
            )
    }
}