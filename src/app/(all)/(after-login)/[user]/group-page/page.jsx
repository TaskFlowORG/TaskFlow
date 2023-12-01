import { Description } from "@/components/Description";
import { SVGGroupsPage } from "@/components/SVGGroupsPage/SVGGroupsPage";
import { UsersToGroupPage } from "@/components/UsersToGroupPage";

export default function Home() {
    return (
        <div className="flex w-screen h-screen pt-28">
            <SVGGroupsPage className="colorOne={#EF4996} colorTwo={#FE7A08} dark:colorOne={#FF973D}" />
            <div className="flex w-1/2 justify-end">
                <Description />
            </div>
            <div className="flex w-1/2 ">
                <UsersToGroupPage/>
            </div>
        </div>
    )
}