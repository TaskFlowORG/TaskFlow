import Cookies from "js-cookie";
import { ChangeEvent, use, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
import { TextToSpeechTeste } from "./components/TextToSpeechTeste/TextToSpeechTeste";

export const GeneralConfig = () => {
  const { user, setUser } = useContext(UserContext);
  const { theme, setTheme } = useTheme();
  const [themeToggle, setThemeToggle] = useState(false);
  const [libras, setLibras] = useState<boolean | undefined>(user?.configuration.libras);
  const [textToSound, setTextToSound] = useState<boolean | undefined>(user?.configuration.textToSound);
  const [googleCalendar, setGoogleCalendar] = useState<boolean | undefined>(user!.configuration.googleCalendar);
  const [showPropertiesName, setShowPropertiesName] = useState<boolean | undefined>(user?.configuration.showPropertiesName);
  const [isTutorialMade, setIsTutorialMade] = useState<boolean>(user!.configuration.isTutorialMade);
  const [initialPageTasksPerDeadline, setInitialPageTasksPerDeadline] = useState<boolean | undefined>(user?.configuration.initialPageTasksPerDeadline);
  const [fontSize, setFontSize] = useState<number | undefined>(user?.configuration.fontSize);
  const [language, setLanguage] = useState<Language | undefined>(user?.configuration.language);
  const [color, setColor] = useState<string>((theme === "dark" ? user?.configuration.secondaryColor : user?.configuration.primaryColor) || "#f04a94");

  useEffect(() => {
    setLibras(user?.configuration.libras);
    setTextToSound(user?.configuration.textToSound);
    setThemeToggle(theme === "dark");
    setFontSize(user?.configuration.fontSize);
    setLanguage(user?.configuration.language);
    setShowPropertiesName(user?.configuration.showPropertiesName);
    setGoogleCalendar(user?.configuration.googleCalendar);
    setInitialPageTasksPerDeadline(user?.configuration.initialPageTasksPerDeadline);
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

  const changeLanguage = async (language: string) => {
    if (!user || !setUser) return;
    const configuration: Configuration = user.configuration;
    configuration.language = language as Language;
    user.configuration = configuration;
    const updatedUser = await userService.patch(user)
    setUser(updatedUser);
  }

  const dataType = async (value: string) => {
    if (!user || !setUser) return;
    const configuration: Configuration = user.configuration;
    if (value == "scheduling") {
      configuration.initialPageTasksPerDeadline = false;
    } else {
      configuration.initialPageTasksPerDeadline = true;
    }
    user.configuration = configuration;
    const updatedUser = await userService.patch(user)
    setUser(updatedUser);
  }

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
        case "showPropertiesName":
          setShowPropertiesName(e.target.checked);
          break
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
        <div className="w-[85%] lg:h-[60%] flex flex-col lg:justify-around lg:gap-0 gap-10 lg:pb-0 pb-32">
          <div className="flex flex-col lg:items-start items-center  lg:grid lg:grid-cols-2 ">
            <div className="w-[95%] ">
              <div className="w-full flex items-start lg:justify-normal h-28">
                <p className="text-primary dark:text-secondary text-h2 font-alata">{t("configuration-title")}</p>
              </div>
              <div className="w-fit h-16 flex flex-col justify-start">
                <p className="text-h3 font-alata dark:text-white">{t("general-config-title")}</p>
                <p className="text-p font-alata dark:text-white">{t("general-config-desc")}</p>
              </div>
              <div className="w-full h-fit">
                <InputFieldConfig id={"theme"} type={"checkbox"} label={t("dark-mode-title")} value={t("dark-mode-configs")} checked={themeToggle} onChange={(e) => updateBack(e, "theme")} />
                <InputFieldConfig id={"googleCalendar"} type={"checkbox"} label={t("google-agendas-title")} value={t("google-agendas-configs")} checked={googleCalendar} onChange={(e) => updateBack(e, "googleCalendar")} />
                <InputSelectConfig id="language" title={t("language-config")} description={t("language-config-desc")} options={[{id:"Português", value:"Português"}, {id:"Español", value:"Español"}, {id:"English", value:"English"}]} func={changeLanguage} defaultValue={user?.configuration.language == Language.PORTUGUESE ? "Português" : user?.configuration.language == Language.SPANISH ? "Español" : "English"} ></InputSelectConfig>
                <InputRangeConfig title={t("text-size-config-title")} description={t("text-size-config-desc")}></InputRangeConfig>
              </div>
            </div>
            <div className="w-[95%]">
              <div className=" flex flex-col gap-3 lg:h-fit h-48 ">
                <div className="w-fit flex flex-col ">
                  <div className="h-fit flex flex-col justify-start">
                    <p className="text-h3 font-alata dark:text-white ">{t("accessibility-config")}</p>
                    <p className="text-p font-alata">
                      {t("accessibility-config-desc")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-around lg:w-full">
                  <InputCheckboxConfig checked={libras || false} func={(e) => updateBack(e, "libras")} label={t("accessibility-config-sign-language")} value="libras"></InputCheckboxConfig>
                  <InputCheckboxConfig checked={textToSound || false} func={(e) => updateBack(e, "textToSound")} label={t("accessibility-config-text-speech")} value="textToSound"></InputCheckboxConfig>
                </div>
              </div>
              <div className="h-fit flex flex-col pt-10">
                <div className="w-fit flex flex-col">
                  <div className="h-fit">
                    <p className="text-h3 font-alata dark:text-white">{t("preferences-config-title")} </p>
                    <p className="text-p font-alata">{t("preferences-config-desc")}</p>
                  </div>
                </div>
                <InputFieldConfig id={"showPropertiesName"} type={"checkbox"} label={t("property-name-config-title")} value={t("property-name-config-desc")} onChange={(e) => updateBack(e, "showPropertiesName")} checked={showPropertiesName} ></InputFieldConfig>
                <InputSelectConfig defaultValue={user?.configuration.initialPageTasksPerDeadline == true ? "Prazo Final" : "Agendamento"} id="dataProperty" title={t("property-data-config-title")} description={t("property-data-config-desc")} options={[{id:"deadLine", value:t("deadLine")}, {id:"Agendamento", value:t("Scheduling")}]} func={dataType}></InputSelectConfig>
                <InputCoresConfig title={t("color-config-title")} description={t("color-config-desc")} functionBall={functionBall}></InputCoresConfig>
              </div>
              <TutorialConfig />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
