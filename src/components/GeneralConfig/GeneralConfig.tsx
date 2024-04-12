import Cookies from "js-cookie";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Obj } from "../Obj";

import { userService } from "@/services";
import { Configuration, Language } from "@/models";
import { InputFieldConfig } from "./components/InputFieldConfig";
import { UserContext } from "@/contexts/UserContext";
import { convertColor } from "@/functions/generateColor";
import { InputCoresConfig } from "./components/InputCoresConfig";
import { TutorialConfig } from "./components/TutorialConfig";
import { InputCheckboxConfig } from "./components/InputCheckboxConfig";
import { useTranslation } from "next-i18next";
import { InputSelectConfig } from "./components/InputSelectConfig";
import { InputRangeConfig } from "./components/InputRangeConfig";

export const GeneralConfig = () => {
  const { user, setUser } = useContext(UserContext);
  const { theme, setTheme } = useTheme();
  const [themeToggle, setThemeToggle] = useState(false);
  const [libras, setLibras] = useState<boolean | undefined>(user?.configuration.libras);
  const [textToSound, setTextToSound] = useState<boolean | undefined>(user?.configuration.textToSound);
  const [googleCalendar, setGoogleCalendar] = useState<boolean | undefined>(user!.configuration.googleCalendar);
  const [isTutorialMade, setIsTutorialMade] = useState<boolean>(user!.configuration.isTutorialMade);
  const [fontSize, setFontSize] = useState<number | undefined>(user?.configuration.fontSize);
  const [language, setLanguage] = useState<Language | undefined>(user?.configuration.language);
  const [color, setColor] = useState<string>((theme === "dark" ? user?.configuration.secondaryColor : user?.configuration.primaryColor) || "#f04a94");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setThemeToggle(theme === "dark");
      } catch (error) { }
    };
    fetchData();
  }, [theme]);

  useEffect(() => {
    setLibras(user?.configuration.libras);
    setTextToSound(user?.configuration.textToSound);
    setThemeToggle(theme === "dark");
    setFontSize(user?.configuration.fontSize);
    setLanguage(user?.configuration.language);
    setGoogleCalendar(user?.configuration.googleCalendar);
  }, [user]);

  const changeColor = (color: string) => {
    (async () => {
      if (!user || !setUser) return;
      theme;
      user.configuration.primaryColor =
        theme === "dark" ? convertColor(color, true) : color;
      user.configuration.secondaryColor =
        theme === "dark" ? color : convertColor(color, false);
      const updatedUser = await userService.patch(user);
      setUser(updatedUser);
    })();
  };

  const { t } = useTranslation();

  const functionBall = (value: Object) => {
    if (value == "+") {
    } else {
      setColor(value as string);
      changeColor(value as string);
    }
  };


  const updateBack = async (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (!user || !setUser) return;
    if (e.target.id == id) {

      switch (id) {
        case "libras":
          setLibras(e.target.checked);
          Cookies.set("libras", e.target.checked.toString());
          break;
        case "textToSound":
          setTextToSound(e.target.checked);
          Cookies.set("textToSound", e.target.checked.toString());
          break;
        case "theme":
          setThemeToggle(e.target.checked);
          setTheme(e.target.checked ? "dark" : "light");
          break;
        case "googleCalendar":
          setGoogleCalendar(e.target.checked);
          break;
      }
      const configuration: Configuration = user.configuration;
      configuration[id] = e.target.checked;
      user.configuration = configuration;
      const updatedUser = await userService.patch(user);
      setUser(updatedUser);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex lg:justify-center items-center justify-start w-full h-full flex-col lg:py-0 py-20">
        <div className="w-[85%] lg:h-[60%] flex flex-col lg:justify-around lg:gap-0 gap-10 pb-32">
          <div className="flex flex-col lg:items-start items-center  lg:grid lg:grid-cols-2 ">
            <div className="w-[95%] ">
              <div className="w-full flex items-start lg:justify-normal h-28">
                <p className="text-primary dark:text-secondary text-h2 font-alata">Configurações</p>
              </div>
              <div className="w-fit h-16 flex flex-col justify-start">
                <p className="text-h3 font-alata dark:text-white">Configurações Gerais </p>
                <p className="text-p font-alata dark:text-white">Aqui você encontra algumas configurações que abrangem todo o aplicativo!</p>
              </div>
              <div className="w-full h-fit">
                <InputFieldConfig id={"theme"} type={"checkbox"} label={"Modo Escuro"} value={t("dark-mode-configs")} checked={themeToggle} onChange={(e) => updateBack(e, "theme")} />
                <InputFieldConfig id={"googleCalendar"} type={"checkbox"} label={"Google Agendas"} value={t("dark-mode-configs")} checked={googleCalendar} onChange={(e) => updateBack(e, "googleCalendar")} />
                <InputFieldConfig id={"language"} type={"checkbox"} label={"Idioma"} value={t("dark-mode-configs")} checked={themeToggle} onChange={(e) => ({})} />
                <InputRangeConfig></InputRangeConfig>

              </div>
            </div>
            <div className="w-[95%]">
              <div className=" flex flex-col gap-3 lg:h-fit h-48 ">
                <div className="w-fit flex flex-col ">
                  <div className="h-fit flex flex-col justify-start">
                    <p className="text-h3 dark:text-white ">Acessibilidade </p>
                    <p className="text-p font-alata">
                      Lorem ipsum dolor sit amet consectetur. Ut varius purus
                      proin a. Euismod placerat tortor ultrices at odio dolor
                      turpis vitae.
                    </p>
                  </div>
                </div>
                <div className="flex justify-around lg:w-full">
                  <InputCheckboxConfig checked={libras || false} func={(e) => updateBack(e, "libras")} label="Libras" value="libras"></InputCheckboxConfig>
                  <InputCheckboxConfig checked={textToSound || false} func={(e) => updateBack(e, "textToSound")} label="Texto para som" value="textToSound"></InputCheckboxConfig>
                </div>
              </div>
              <div className="h-fit flex flex-col pt-10">
                <div className="w-fit flex flex-col">
                  <div className="h-fit">
                    <p className="text-h3 font-alata dark:text-white">Preferências </p>
                    <p className="text-p font-alata">Aqui você pode definir suas preferências a respeito da sua experiencia no nosso TaskFlow!</p>
                  </div>
                </div>
                <InputFieldConfig id={"propertyNames"} type={"checkbox"} label={"Nome das propriedades"} value={"Apenas o nome das propriedades será exibido, ao invés de seus valores também."} onChange={() => { }} checked={false} ></InputFieldConfig>
                <InputSelectConfig></InputSelectConfig>
                <InputCoresConfig functionBall={functionBall}></InputCoresConfig>
              </div>
              <TutorialConfig />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
