interface Props{
    date:string
}

export const CardDate = ({date}:Props) => {
    return (
        <>
            <div className="flex gap-2 items-center bg-[yellow] ">
                <img src="cardContentIcons/date.svg" alt="" />
                <p className="p mn text-[#797979] mt-[0.08rem] w-max">{date}</p>
            </div>
        </>
    )
}