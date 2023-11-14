import { CardDate } from "./CardProperties/CardDate"
import { CardProgress } from "@/components/CardContent/CardProperties/CardProgress"
import { CardTag } from "./CardProperties/CardTags"
import { CardRadios } from "./CardProperties/CardRadios"

export const CardContent = () => {
    return (
        <>
            <div className="flex justify-between">
                <h4>Task Name</h4>
                <div className="  flex items-center relative w-16">
                    <span className="w-8 h-8 rounded-full bg-pink absolute shadowww  right-8"></span>
                    <span className="w-8 h-8 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
                    <span className="w-8 h-8 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span>

                </div>
            </div>
            <p className=" w-full text-[#797979]">Lorem ipsum dolor sit amet consectetur. Mauris ullamcorper pretium sollicitudin montes maecenas nisl. </p>
            <CardDate/>
            <CardTag/>
            <CardRadios/>

        </>
    )
}


