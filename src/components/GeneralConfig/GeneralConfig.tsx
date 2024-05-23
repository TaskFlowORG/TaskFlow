
import { ChangeEvent, useContext, useEffect, useState } from "react";
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
import Cookies from "js-cookie";
import { LanguageContext } from "@/contexts/ContextLanguage";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { useRouter } from "next/navigation";
import { If } from "@/components/If";


export const GeneralConfig = () => {
  const { user, setUser } = useContext(UserContext);
  const { theme, setTheme } = useTheme();
  const { changeLanguage: changeGlobal } = useContext(LanguageContext)
  const { t } = useTranslation();
  const route = useRouter();
  const asynThrow = useAsyncThrow();

  const [libras, setLibras] = useState<boolean | undefined>(user?.configuration.libras);
  const [textToSound, setTextToSound] = useState<boolean | undefined>(user?.configuration.textToSound);
  const [authenticate, setAuthenticate] = useState<boolean | undefined>(user!.authenticate);
  const [googleAgendas, setGoogleAgendas] = useState<boolean | undefined>(user?.configuration.googleCalendar);
  const [showPropertiesName, setShowPropertiesName] = useState<boolean | undefined>(user?.configuration.showPropertiesName);
  const [initialPageTasksPerDeadline, setInitialPageTasksPerDeadline] = useState<boolean | undefined>(user?.configuration.initialPageTasksPerDeadline);
  const [fontSize, setFontSize] = useState<number | undefined>(user?.configuration.fontSize);
  const [language, setLanguage] = useState<Language | undefined>(user?.configuration.language);
  const [color, setColor] = useState<string>((theme === "dark" ? user?.configuration.secondaryColor : user?.configuration.primaryColor) || "#f04a94");
  const [themeToggle, setThemeToggle] = useState(false);
  const [isLinkedGoogle, setIsLinkedGoogle] = useState<boolean>(false);

  useEffect(() => {
    userService.isLinkedGoogle(user?.id).then((response) => {
      setIsLinkedGoogle(response)
    })
    setLibras(user?.configuration.libras);
    setTextToSound(user?.configuration.textToSound);
    setThemeToggle(theme === "dark");
    setFontSize(user?.configuration.fontSize);
    setLanguage(user?.configuration.language);
    setShowPropertiesName(user?.configuration.showPropertiesName);
    setAuthenticate(user?.authenticate);
    setGoogleAgendas(user?.configuration.googleCalendar)
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
      const updatedUser = await userService.patch(user).catch(asynThrow);
      if (updatedUser)
        setUser(updatedUser);
    })();
  };

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
    const updatedUser = await userService.patch(user).catch(asynThrow);
    if (updatedUser)
      setUser(updatedUser);
    changeGlobal(language as Language)
  }

  const changeFont = async (font: string) => {
    if (!user || !setUser) return;
    user.configuration.font = font;
    const updatedUser = await userService.patch(user).catch(asynThrow);
    if (updatedUser)
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
    const updatedUser = await userService.patch(user).catch(asynThrow);
    if (updatedUser)
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
        case "showPropertiesName":
          setShowPropertiesName(e.target.checked);
          break
        case "googleCalendar":
          if (!googleAgendas) {
            route.push("http://localhost:9999/calendar/google/auth")
            setGoogleAgendas(e.target.checked);
          }
          break
        case "authenticate":
          user.authenticate = e.target.checked;
          break;
      }
      if (e.target.id != "theme") {
        const configuration: Configuration = user.configuration;
        configuration[id] = e.target.checked;
        user.configuration = configuration;
        const updatedUser = await userService.patch(user).catch(asynThrow);
        if (updatedUser)
          setUser(updatedUser);
      }
    }
  };

  return (
    <div className="lg:pl-20 pl-0 flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center lg:grid lg:grid-cols-2 lg:w-[95%] w-[85%] h-full pt-16">
        <div className="w-[97%]">
          <div className="w-full h-fit flex flex-col gap-8 ">
            <p className="text-primary dark:text-secondary text-h2 font-alata">{t("configuration-title")}</p>
            <div className="w-fit flex flex-col justify-start">
              <p className="text-h3 font-alata dark:text-white">{t("general-config-title")}</p>
              <p className="text-p font-montserrat dark:text-white">{t("general-config-desc")}</p>
            </div>
            <InputFieldConfig id={"theme"} type={"checkbox"} label={t("dark-mode-title")} value={t("dark-mode-configs")} checked={themeToggle} onChange={(e) => updateBack(e, "theme")} />
            <InputFieldConfig id={"authenticate"} type={"checkbox"} label={t("authenticate-title")} value={t("authenticate-configs")} checked={authenticate} onChange={(e) => updateBack(e, "authenticate")} />
            <InputSelectConfig id="language" title={t("language-config")} description={t("language-config-desc")} options={[{ id: "Português", value: "Português" }, { id: "Español", value: "Español" }, { id: "English", value: "English" }]} func={changeLanguage} defaultValue={user?.configuration.language == Language.PORTUGUESE ? "Português" : user?.configuration.language == Language.SPANISH ? "Español" : "English"} ></InputSelectConfig>
            <InputRangeConfig title={t("text-size-config-title")} description={t("text-size-config-desc")}></InputRangeConfig>
            <InputSelectConfig id="font" title={t("font-config")} description={t("font-config-desc")} options={[{ id: "Montserrat", value: "Montserrat" }, { id: "Arial", value: "Arial" }, { id: "Poppins", value: "Poppins" }]} func={changeFont} defaultValue={user?.configuration.font ?? "Montserrat"} ></InputSelectConfig>
          </div>
        </div>
        <div className="w-[97%] flex flex-col lg:pt-3 pt-6">
          <div className={`w-full h-fit flex flex-col gap-5 ${!isLinkedGoogle ? "pt-0 lg:pt-[6rem]" : "pt-0"}`}>
            <div className="h-fit flex flex-col gap-5">
              <If condition={isLinkedGoogle}>
                <InputFieldConfig id={"googleCalendar"} type={"checkbox"} label={t("google-calendar-title")} value={t("google-calendar-configs")} onChange={(e) => updateBack(e, "googleCalendar")} checked={googleAgendas} ></InputFieldConfig>
              </If>
              <div>
                <p className="text-h3 font-alata dark:text-white ">{t("accessibility-config")}</p>
                <p className="text-p font-montserrat">{t("accessibility-config-desc")}</p>
                <div className="flex justify-around w-full pt-3">
                  <InputCheckboxConfig checked={libras || false} func={(e) => updateBack(e, "libras")} label={t("accessibility-config-sign-language")} value="libras"></InputCheckboxConfig>
                  <InputCheckboxConfig checked={textToSound || false} func={(e) => updateBack(e, "textToSound")} label={t("accessibility-config-text-speech")} value="textToSound"></InputCheckboxConfig>
                </div>
              </div>
            </div>
            <div className="w-fit flex flex-col">
              <div className="h-fit">
                <p className="text-h3 font-alata dark:text-white">{t("preferences-config-title")} </p>
                <p className="text-p font-montserrat">{t("preferences-config-desc")}</p>
              </div>
            </div>
            <InputFieldConfig id={"showPropertiesName"} type={"checkbox"} label={t("property-name-config-title")} value={t("property-name-config-desc")} onChange={(e) => updateBack(e, "showPropertiesName")} checked={showPropertiesName} ></InputFieldConfig>
            <InputSelectConfig defaultValue={user?.configuration.initialPageTasksPerDeadline == true ? "Prazo Final" : "Agendamento"} id="dataProperty" title={t("property-data-config-title")} description={t("property-data-config-desc")} options={[{ id: "deadLine", value: t("deadLine") }, { id: "Agendamento", value: t("Scheduling") }]} func={dataType}></InputSelectConfig>
            <InputCoresConfig title={t("color-config-title")} description={t("color-config-desc")} functionBall={functionBall}></InputCoresConfig>
          </div>
          <div className="lg:pb-0 pb-36">
            <TutorialConfig />
          </div>
        </div>
      </div>
    </div>
  );
};