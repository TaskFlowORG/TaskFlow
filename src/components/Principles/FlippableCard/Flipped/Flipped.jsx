export const Flipped = ({content}) => {
    return (
        <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md w-full">
            <div className=" max-w-[236px] w-max z-[11] h-max min-h-[313px] flex items-center p-4 bg-white rounded-md shadowww">
                <div className="flex gap-6 flex-col justify-center items-center h-full">

                    <p className="h4  h-full text-primary text-center">{content}</p>
                </div>

            </div>
        </div>
    )
}