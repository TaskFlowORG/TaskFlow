import { Function } from "./Function"

export const Features = () => {
    return (
        <div className="w-full flex items-center flex-col gap-[4.5rem] ">
            <h2 className="h3 w-min text-primary lg:text-[48px] text-center md:whitespace-nowrap">Nossas Funcionalidades</h2>
            <div className="flex relative flex-col gap-8 md:gap-32 items-center max-w-[956px] w-full p-8 ">
                <div className="w-2 h-full md:hidden bg-primary absolute centeredAbsolute">

                </div>
                <Function text={"text-[#E41CEF]"} bg={"timeline__primaryToPurple"} size={"h-[400px]"} />
                <Function text={"text-primary"} bg={"timeline__purpleTosecondary"} size={"h-[600px]"} />
                <Function text={"text-secondary"} bg={"bg-secondary"} size={"h-[400px]"} />
            </div>
        </div>
    )
}