"use client";
import 'regenerator-runtime/runtime'

import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import { ReactNode,useEffect,useState } from "react";
import { Language, User } from "@/models";
import { UserContext } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/ContextLanguage";
import { AppProps } from "next/app";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from "../../../i18n";
import { TextToSpeechTeste } from "@/components/GeneralConfig/components/TextToSpeechTeste/TextToSpeechTeste";
import ErrorBoundary from '@/components/ErrorPage/ErrorBoudary';

type Props = AppProps & {
  text: string
  children: ReactNode
};



export default function Layout({ children, text }: Props) {

  const {t} = useTranslation();
  const [user, setUser] = useState<User>();
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  

  return (
      <UserContext.Provider value={{ user, setUser }}>
        <LanguageProvider language={language} setLanguage={setLanguage}>
          <I18nextProvider i18n={i18next} >
            <body id="body" className={`w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start`}>
              {user?.configuration.libras ? <VLibras forceOnload /> : null}
              {user?.configuration.textToSound ? <TextToSpeechTeste></TextToSpeechTeste> : null}
              <Providers>
                <ThemeSwitcher />
                <ErrorBoundary t={t}>
                {children}
            </ErrorBoundary>
              </Providers>
            </body>

          </I18nextProvider>
        </LanguageProvider>
      </UserContext.Provider>
  );
}

 