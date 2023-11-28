export const Dev = ({name, description}) => {
    return (

        <div className="relative min-h-[254px] mt-16 min-w-[315px] flex flex-col shadowww rounded-lg gap-4 p-6 pt-12 pb-8 max-w-[318px] w-full">
            <h3 className="h3 text-primary self-center">{name}</h3>
            <div className="h-[92px] w-[92px] bg-white absolute centeredAbsoluteTop z-[10] rounded-full shadowww">

            </div>
            <p className="p h-full  text-justify">{description} </p>
        </div>
    )
}