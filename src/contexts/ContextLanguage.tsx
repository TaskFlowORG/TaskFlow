"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Language } from '@/models';
import { languageToString } from '@/functions/selectLanguage';
import { useTranslation } from 'next-i18next';
import Cookies from "js-cookie";
import { userService } from '@/services';
// Definindo o tipo do contexto
type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
};

// Criando o contexto
export const LanguageContext = createContext<LanguageContextType>({
  language: Language.PORTUGUESE, // Idioma padrão
  changeLanguage: () => {}, // Função vazia como padrão
});

// Hook customizado para acessar o contexto de idioma
export const useLanguage = () => useContext(LanguageContext);

// Provedor do contexto de idioma

type Props = {
  children: React.ReactNode;
  setLanguage: (lang: Language) => void;
  language: Language;
};
export const LanguageProvider = ({ children, setLanguage, language }:Props) => {
  const { i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    (async() => {
      if (!user || !setUser) return;
      user.configuration.language = language;
      const updatedUser = await userService.patch(user)
      setUser(updatedUser);
    })()
  }, [language]);


  // Função para alterar o idioma
  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(languageToString(lang));
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};