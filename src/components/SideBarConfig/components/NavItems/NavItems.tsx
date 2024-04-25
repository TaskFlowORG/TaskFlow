import Link from "next/link";

interface Props{
    extendida: boolean; 
    href: string; 
    icon: string; 
    text: string;
}

export const NavItems = ({extendida, href, icon, text, }:Props) => (
    <div className={`w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl`}>
      <Link href={href}>
        <div className="flex items-center gap-5 h-full px-6">
          <img className="w-7 h-8" src={icon} alt="" />
          <h4 className={`duration-0 whitespace-nowrap ${extendida ? "h4 lg:block hidden" : "hidden"}`}>
            {text}
          </h4>
        </div>
      </Link>
    </div>
  );