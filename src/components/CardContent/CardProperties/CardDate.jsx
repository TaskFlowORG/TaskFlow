export const CardDate = ({date}) => {
    return (
        <>
            <div className="flex gap-2 items-center ">
                <img src="date.svg" alt="" />
                <p className="mn text-[#797979] mt-[0.08rem] w-max">{date}</p>
            </div>
        </>
    )
}