"use client";

import "@/styles/global.css";
import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import Cookies from "js-cookie";
import { ReactNode, useState } from "react";
import { User } from "@/models";
import { UserContext } from "@/contexts/UserContext";
import Head from "next/head";
import { LanguageProvider } from "@/contexts/ContextLanguage";
import { AppProps } from "next/app";
import { I18nextProvider } from 'react-i18next'; //
import i18next from "../../i18n";
import { useSpeechSynthesis } from 'react-speech-kit';

type Props = AppProps & {
  children: ReactNode
};

export default function RootLayout({ children }: Props) {
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
              //Rever isso aqui depois("Retire a verificação se a config ta como true no bd e deixei só pra ver nos cookies pq tava dando erro")
                <VLibras forceOnload={Cookies.getJSON("libras") == true} />
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

