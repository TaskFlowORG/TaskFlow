import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  extendida: boolean;
  href: string;
  icon: ReactNode;
  text: string;
}

export const NavItems = ({ extendida, href, icon, text }: Props) => (
  <div
    className={`w-full flex flex-col h-12 justify-center duration-700 hover:backdrop-brightness-[115%] rounded-sm`}
  >
    <Link href={href} className="w-min">
      <div className="flex items-center w-min gap-5 h-full px-6">
        <span className="w-min h-min">{icon}</span>
        <h4 className={`text-h4 font-alata whitespace-nowrap pr-4 hidden lg:flex overflow-clip`}>{text}</h4>
      </div>
    </Link>
  </div>
);
