
"use client";
import { SelectWithImage } from "@/components/SelectWithImage/SelectwithImage";
import { Language } from "@/models";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { LanguageContext, LanguageProvider } from "@/contexts/ContextLanguage";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";


export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme(); 
  const {changeLanguage, language} = useContext(LanguageContext)
  const {setUser} = useContext(UserContext);
  useEffect(() => {
    changeLanguage((Cookies.get("language") as Language) ?? Language.ENGLISH);
    if(!setUser) return;
    setUser(undefined);
  }, [setUser]);

  return (
    <>
      <div className=" p-4 flex justify-between w-full items-center fixed z-[99]">
        <Link href="/">
        <Image
          src="Icon.svg"
          alt="icon"
          width={64}
          height={64}
          className="grayscale brightness-[60] invert dark:invert-0 cursor-pointer"
        />
        </Link>
        <div className="flex gap-6">
          <Image
            src="moon.svg"
            className="dark:hidden cursor-pointer brightness-[0.1]"
            alt="dark"
            width={24}
            height={24}
            onClick={() => setTheme("dark")}
          />
          <Image
            src="sun.svg"
            className="hidden dark:flex cursor-pointer"
            alt="light"
            width={24}
            height={24}
            onClick={() => setTheme("light")}
          />
            
           <SelectWithImage onChange={lang => changeLanguage(lang as Language)} selected={(language ? language : Language.ENGLISH
           )}
            list={[{ value: Language.PORTUGUESE, image: <Image alt="Portuguese" width={24} height={12} src="/img/flags/brazil.jpg" className="select-none rounded-sm" /> },
            { value: Language.ENGLISH, image: <Image alt="English" width={24} height={12} src="/img/flags/eua.jpg" className="select-none rounded-sm" /> },
            { value: Language.SPANISH, image: <Image alt="Spanish" width={24} height={12} src="/img/flags/spain.jpg" className="select-none rounded-sm" /> }]} />
        </div>
      </div>
      {children}
    </>
  );
}
