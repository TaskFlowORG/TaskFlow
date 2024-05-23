"use client";
import 'regenerator-runtime/runtime'
import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import { ReactNode, useEffect, useState } from "react";
import { Language, User } from "@/models";
import { UserContext } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/ContextLanguage";
import { AppProps } from "next/app";
import { I18nextProvider, I18nextProviderProps, useTranslation } from 'react-i18next';
import i18next from "../../../i18n";
import { TextToSpeech } from "@/components/GeneralConfig/components/TextToSpeech/TextToSpeech";
import ErrorBoundary from '@/components/ErrorPage/ErrorBoudary';
import "@/styles/global.css";
import Cookies from 'js-cookie';

type Props = AppProps & {
  text: string
  children: ReactNode
};



export default function Layout({ children, text }: Props) {

  const { t } = useTranslation();
  const [user, setUser] = useState<User>();
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  useEffect(() => {
    document.documentElement.style.removeProperty('--primary-color');
    document.documentElement.style.removeProperty('--secondary-color');
    document.documentElement.style.removeProperty('--contrast-color');
    document.documentElement.style.removeProperty('--font-size-h1');
    document.documentElement.style.removeProperty('--font-size-h2');
    document.documentElement.style.removeProperty('--font-size-h3');
    document.documentElement.style.removeProperty('--font-size-h4');
    document.documentElement.style.removeProperty('--font-size-h5');
    document.documentElement.style.removeProperty('--font-size-p');
    document.documentElement.style.removeProperty('--font-size-p14');
    document.documentElement.style.removeProperty('--font-size-mn');
    document.documentElement.style.removeProperty('--font-size-mnAlata');
    document.documentElement.style.removeProperty('--common-font');
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LanguageProvider language={language} setLanguage={setLanguage}>
        <I18nextProvider i18n={(i18next as unknown as I18nextProviderProps["i18n"])} >
          <body id="body" className={`w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start`}>
            {user?.configuration.textToSound ? <TextToSpeech></TextToSpeech> : null}
            {user?.configuration.libras ? <VLibras forceOnload /> : null}
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
