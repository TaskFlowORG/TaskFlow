import { Description } from "@/components/Description";
import { SVGGroupsPage } from "@/components/SVGGroupsPage/SVGGroupsPage";

export default function Home() {
    return (
        <div className="flex w-screen h-screen pt-20">
            <SVGGroupsPage />
            <div className="flex w-1/2 justify-end">
                <Description />
            </div>
            <div className=" w-1/2">

            </div>
        </div>
    )
}