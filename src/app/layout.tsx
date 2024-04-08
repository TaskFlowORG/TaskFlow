"use client";

import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import "@/styles/global.css";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { Language, User } from "@/models";
import { UserContext } from "@/contexts/UserContext";
import Head from "next/head";
import { LanguageProvider } from "@/contexts/ContextLanguage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { I18nextProvider } from 'react-i18next'; //
import i18next from "../../i18n";

type Props = AppProps & {
  children: ReactNode
};

export default function RootLayout ({ children }: Props) {
  const [user, setUser] = useState<User>();



  return (
    <html lang="pt-br" className="w-screen h-screen">
      <Head>
        <title>Task Flow</title>
        <link rel="icon" href="/Icon.svg" />
      </Head>
      <UserContext.Provider value={{ user, setUser }}>
        <LanguageProvider>
          <I18nextProvider i18n={i18next}>
          <body className="w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
            {user
              ? user.configuration.libras
              : true && <VLibras forceOnload={Cookies.getJSON("libras")} />}
            <Providers>
              <ThemeSwitcher />
              {children}
            </Providers>
          </body>
          </I18nextProvider>
        </LanguageProvider>
      </UserContext.Provider>
    </html>
  );
}

