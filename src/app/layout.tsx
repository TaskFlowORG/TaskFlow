"use client";
import 'regenerator-runtime/runtime'

import "@/styles/global.css";
import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { Language, User } from "@/models";
import { UserContext } from "@/contexts/UserContext";
import Head from "next/head";
import { LanguageProvider } from "@/contexts/ContextLanguage";
import { AppProps } from "next/app";
import { I18nextProvider } from 'react-i18next';
import i18next, { i18n } from "../../i18n";
import { TextToSpeechTeste } from "@/components/GeneralConfig/components/TextToSpeechTeste/TextToSpeechTeste";

type Props = AppProps & {
  text: string
  children: ReactNode
};

export default function RootLayout({ children, text }: Props) {
  const [user, setUser] = useState<User>();
  const [language, setLanguage] = useState<Language>(Language.PORTUGUESE);

  return (
    <html lang="pt-br" className="w-screen h-screen">
      <UserContext.Provider value={{ user, setUser }}>
        <LanguageProvider language={language} setLanguage={setLanguage}>
          <I18nextProvider i18n={i18next} >
            <body id="body" className={`w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start`}>
              {user?.configuration.libras ? <VLibras forceOnload={Cookies.getJSON("libras")} /> : null}
              {user?.configuration.textToSound ? <TextToSpeechTeste></TextToSpeechTeste> : null}
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

 