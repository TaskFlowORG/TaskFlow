import { SideBarConfig } from "@/components/SideBarConfig";
import { User } from "@/models";

interface Props {
    user: User;
}

export default function Layout({ children, user }: { children: React.ReactNode, user: User }) {
    return (
        <>
            <div className="relative flex w-full h-full">
                <SideBarConfig user={user}></SideBarConfig>
                {children}
            </div>

        </>
    )
}