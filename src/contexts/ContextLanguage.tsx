import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Language } from '@/models';
import { languageToString } from '@/functions/selectLanguage';
import { useTranslation } from 'next-i18next';

// Definindo o tipo do contexto
type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

// Criando o contexto
const LanguageContext = createContext<LanguageContextType>({
  language: 'en', // Idioma padrão
  changeLanguage: () => {}, // Função vazia como padrão
});

// Hook customizado para acessar o contexto de idioma
export const useLanguage = () => useContext(LanguageContext);

// Provedor do contexto de idioma
export const LanguageProvider = ({ children }:{children:React.ReactNode}) => {
  const { i18n} = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const {user} = useContext(UserContext);

  useEffect(() => {
    let lang = 'en';
    console.log(user?.configuration?.language)
    if (user?.configuration?.language) {
      lang = languageToString(user.configuration.language);
    }else{
      lang = navigator.language; 
    }
    console.log(i18n)
    changeLanguage(lang);
  }, [user]);

  // Função para alterar o idioma
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};