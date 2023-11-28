export const Unflipped = ({img, title}) => {
    return (
        <div className=" w-full p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
        <div className=" px-16 pt-12 w-max z-[11] h-max min-h-[313px] bg-white rounded-md shadowww">
            <div className="flex gap-6 flex-col justify-center">
                <img src={img} alt="" />
                <p className="h4 text-primary text-center">{title}</p>
            </div>

        </div>
    </div>
    )
}