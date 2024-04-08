import { Language } from "@/models";

export    const languageToString = (lang: Language) => {
  
    switch(lang) {
      case Language.SPANISH:
        return 'es';
      case Language.PORTUGUESE:
        return 'pt';
      default:
        return 'en';
    } 
  }