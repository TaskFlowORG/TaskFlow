import { Description } from "@/components/Description";
import { SVGGroupsPage } from "@/components/SVGGroupsPage/SVGGroupsPage";
import { UsersToGroupPage } from "@/components/UsersToGroupPage";

export default function Home() {
    return (
        <div className="flex w-screen h-screen pt-36">
            <SVGGroupsPage />
            <div className="flex w-1/2 justify-end">
                <Description />
            </div>
            <div className="flex w-1/2 ">
                <UsersToGroupPage/>
            </div>
        </div>
    )
}