import { Description } from "@/components/Description";
import { SVGGroupPage } from "@/components/SVGGroupPage/SVGGroupPage";
import { UsersList } from "@/components/UsersList";

export default function Home({ dark  }) {
    return (
        <div className="flex w-screen h-screen pt-28">
        <SVGGroupPage />
            <div className="flex w-1/2 justify-end">
                <Description />
            </div>
            <div className="flex w-1/2 ">
                <UsersList/>
            </div>
        </div>
    )
}