import Cookies from "js-cookie";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { userService } from "@/services";
import { Configuration, User, UserPut, Language } from "@/models";
import { Obj } from "../Obj";
import { InputFieldConfig } from "./components/InputFieldConfig";
import { UserContext } from "@/contexts/UserContext";
import { convertColor } from "@/functions/generateColor";

export const GeneralConfig = () => {
  const { user, setUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(true);
  const { theme, setTheme } = useTheme();
  const [themeToggle, setThemeToggle] = useState(false);
  const [libras, setLibras] = useState<boolean | undefined>(
    user?.configuration.libras
  );
  const [textToSound, setTextToSound] = useState<boolean | undefined>(
    user?.configuration.textToSound
  );
  const [fontSize, setFontSize] = useState<number | undefined>(
    user?.configuration.fontSize
  );
  const [language, setLanguage] = useState<Language | undefined>(
    user?.configuration.language
  );
  const [color, setColor] = useState<string>(
    (theme === "dark"
      ? user?.configuration.secondaryColor
      : user?.configuration.primaryColor) || "#f04a94"
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setThemeToggle(theme === "dark");
      } catch (error) {}
    };

    fetchData();
  }, [theme]);

  //Falta implementar no BackEnd ainda

  //const [googleAgendas, setGoogleAgendas] = useState<boolean>();
  //Visualização de nome de propriedades em todas as tarefas
  //Tipo de propriedade data
  //Refazer tutorial
  //Tutorial avançado? não é bem configuracao mas deixa ai pra lembrar dps

  useEffect(() => {
    setLibras(user?.configuration.libras);
    setTextToSound(user?.configuration.textToSound);
    setThemeToggle(theme === "dark");
    setFontSize(user?.configuration.fontSize);
    setLanguage(user?.configuration.language);
    //setGoogleAgendas(usuario.configuration.googleAgendas)
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

  const functionBall = (value: Object) => {
    if (value == "+") {
    } else {
      setColor(value as string);
      changeColor(value as string);
    }
  };

  //Testando alguma forma de fazer o text to speech
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
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
          if (e.target.id == "theme") {
            setThemeToggle(e.target.checked);
            setTheme(e.target.checked ? "dark" : "light");
          }
      }
      const configuration: Configuration = user.configuration;
      configuration[id] = e.target.checked;
      user.configuration = configuration;
      const updatedUser = await userService.patch(user);
      setUser(updatedUser);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="flex lg:justify-center items-center justify-start w-full h-full flex-col py-20">
        <div className="w-[85%] h-full flex flex-col justify-around lg:gap-0 gap-10">
          <div className="w-fit">
            <p className="h2 text-primary dark:text-secondary">Configurações</p>
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            <div className="w-[95%] ">
              <div className="w-fit">
                <p className="h3 dark:text-white">Configurações Gerais </p>
              </div>
              <div className="w-full">
                <InputFieldConfig
                  id={"theme"}
                  type={"checkbox"}
                  label={"Modo Escuro"}
                  value={
                    "Ao ativar essa opção você estará mudando o seu tema para escuro, outra forma de fazer isso é no cabeçalho da página pressionando sobre o icone de lua ou sol."
                  }
                  checked={themeToggle}
                  onChange={(e) => updateBack(e, "theme")}
                />
                <InputFieldConfig
                  id={"??"}
                  type={"checkbox"}
                  label={"Google Agendas"}
                  value={
                    "Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae."
                  }
                  checked={false}
                  onChange={() => {}}
                />
                <InputFieldConfig
                  id={"language"}
                  type={"checkbox"}
                  label={"Idioma"}
                  value={
                    "Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae."
                  }
                  checked={false}
                  onChange={() => {}}
                />
                <InputFieldConfig
                  id={"fontSize"}
                  type={"checkbox"}
                  label={"Tamanho da fonte"}
                  value={
                    "Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae."
                  }
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="w-[95%]">
              <div className="h-fit flex flex-col gap-3 ">
                <div className="w-fit flex flex-col">
                  <p className="h3 dark:text-white ">Acessibilidade </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Ut varius purus
                    proin a. Euismod placerat tortor ultrices at odio dolor
                    turpis vitae.
                  </p>
                </div>
                <div className="flex justify-between lg:w-[40%]">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className=" min-w-[2.2vh] min-h-[2.2vh] w-full h-full"
                      id="libras"
                      checked={libras}
                      onChange={(e) => updateBack(e, "libras")}
                    />
                    <p className="p pl-4">Libras</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className=" min-w-[2.2vh] min-h-[2.2vh] w-full h-full"
                      id="textToSound"
                      checked={textToSound}
                      onChange={(e) => updateBack(e, "textToSound")}
                    />
                    <p className="p pl-4">Texto para som</p>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col justify-around">
                <div className="w-fit flex flex-col">
                  <p className="h3 dark:text-white ">Preferências </p>
                  <p>
                    Aqui você pode definir suas preferências a respeito da sua
                    experiencia no nosso TaskFlow!
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="h4">Nome das propriedades</p>
                  <div className="flex items-center font-bold">
                    <label className="relative w-16 h-8 ml-4 mr-2">
                      <input
                        type={"checkbox"}
                        className="opacity-0 w-0 h-0 toggle-input"
                        onClick={() => {
                          setToggle(!toggle);
                        }}
                      />
                      <span
                        className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                            before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"
                      ></span>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="p">
                    Visualizar nome de propriedades em todas as tarefas, ao
                    invés do seu valor também
                  </p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <p className="h4">Propriedade data</p>
                    <div className="flex items-center font-bold">
                      <div className="h-min w-fit relative">
                        <select className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary dark:border-secondary rounded-sm text-primary dark:text-secondary text-center lg:w-full pr-[7vh]">
                          <option
                            value="Português (Brasil)"
                            key="1"
                            className="w-full "
                          >
                            Selected
                          </option>
                        </select>
                        <div className=" border-l-[2px] border-primary dark:border-secondary -z-[10] lg:w-16 w-10 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary dark:text-secondary font-mono ">
                          <span className=" rotate-90">{">"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="p">
                      Escolha por qual tipo de propriedade data você deseja ver
                      suas tarefas do dia na “Página Inicial”.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <p className="h4">Cores</p>
                    <div className="relative">
                      <Obj
                        objs={[
                          "#f04a94",
                          "#f76858",
                          "#A763DD",
                          "#72BF7E",
                          "#7FAEF5",
                          "+",
                        ]}
                        mawWidth="w-max"
                        max={2}
                        functionObj={functionBall}
                        color
                        isString
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="p">
                    Escolha sua cor principal, nós geraremos uma cor secundária
                    para você!
                  </p>
                </div>
              </div>
              <div className="h-full flex  items-center justify-between">
                <div className="w-[50%] flex flex-col">
                  <p className="h3 dark:text-white ">Tutorial </p>
                  <p className="p">
                    Compreenda perfeitamente todas as funcionalidades dentro de
                    nosso aplicativo, aproveitando ao máximo seu uso!
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-primary dark:bg-secondary w-44 h-12 rounded-md flex items-center justify-center">
                    <p className="p text-white ">Refazer Tutorial</p>
                  </div>
                  <div className="bg-primary dark:bg-secondary w-44 h-12 rounded-md flex items-center justify-center">
                    <p className="p text-white ">Tutorial Avançado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
