import { Description } from "@/components/Description";
import { SVGGroupsPage } from "@/components/SVGGroupsPage/SVGGroupsPage";
import { UsersToGroupsPage } from "@/components/UsersToGroupsPage";

export default function Home() {
    return (
        <div className="flex w-screen h-screen pt-20">
            <SVGGroupsPage />
            <div className="flex w-1/2 justify-end">
                <Description />
            </div>
            <div className="flex w-1/2  ">
                <UsersToGroupsPage/>
            </div>
        </div>
    )
}