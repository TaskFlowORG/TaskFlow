import { MouseEventHandler, useState } from 'react';
import { useTheme } from "next-themes";
import { Obj } from '../Obj';
import { userService } from '@/services';

export const GeneralConfig = () => {

    const [toggle, setToggle] = useState(true);
    const [color, setColor] = useState<string>("#00ff00")
    const { theme, setTheme } = useTheme();

    const mudarTema = () => {
        if (!toggle) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    const functionBall = (value: Object) => {
        if (value == "+") {

        }
        else {
            setColor(value as string)
        }
    }

    return (
        <div className="w-[80%] h-[80%]">
            <div className='w-fit px-2'>
                <p className='h2 text-primary dark:text-secondary'>Configurações</p>
            </div>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='grid grid-cols-2'>
                    <div className='w-[95%] '>
                        <div className='w-fit pb-14'>
                            <p className='h3 dark:text-white'>Configurações Gerais </p>
                        </div>
                        <div className='w-full'>
                            <InputFieldConfig type={"checkbox"} label={"Modo Escuro"} value={"Ao ativar essa opção você estará mudando o seu tema para escuro, outra forma de fazer isso é no cabeçalho da página pressionando sobre o icone de lua ou sol."} onClickTema={() => mudarTema()} onClickSet={() => setToggle(!toggle)} />
                            <InputFieldConfig type={"checkbox"} label={"??"} value={"Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae."} onClickTema={() => { }} onClickSet={() => { }} />
                            <InputFieldConfig type={"checkbox"} label={"??"} value={"Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae."} onClickTema={() => { }} onClickSet={() => { }} />
                            <InputFieldConfig type={"checkbox"} label={"??"} value={"Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae."} onClickTema={() => { }} onClickSet={() => { }} />
                        </div>
                    </div>
                    <div className='w-[95%]'>
                        <div className='h-fit flex flex-col '>
                            <div className='w-fit flex flex-col'>
                                <p className='h3 dark:text-white '>Acessibilidade </p>
                                <p>Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                            <div className='flex justify-between w-[40%]'>
                                <div className='flex items-center'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Libras</p>
                                </div>
                                <div className='flex items-center'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Texto para som</p>
                                </div>
                            </div>
                        </div>
                        <div className='h-[60%] flex flex-col justify-around'>
                            <div className='w-fit flex flex-col'>
                                <p className='h3 dark:text-white '>Preferências </p>
                                <p>Aqui você pode definir suas preferências a respeito da sua experiencia no nosso TaskFlow!</p>
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <p className="h4">Nome das propriedades</p>
                                    <div className="flex items-center font-bold">
                                        <label className="relative w-16 h-8 ml-4 mr-2" >
                                            <input type={'checkbox'} className="opacity-0 w-0 h-0 toggle-input" onClick={() => { setToggle(!toggle); }} />
                                            <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider">
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className=' '>
                                    <p className='p'>Visualizar nome de propriedades em todas as tarefas, ao invés do seu valor também</p>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <p className="h4">Tipo de propriedade data</p>
                                    <div className="flex items-center font-bold">
                                        <div className="h-min w-fit relative">
                                            <select className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary dark:border-secondary rounded-sm text-primary dark:text-secondary text-center w-full pr-[7vh]">
                                                <option value="Português (Brasil)" key="1" className="w-full ">Selected</option>
                                            </select>
                                            <div className=" border-l-[2px] border-primary dark:border-secondary -z-[10] w-16 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary dark:text-secondary font-mono ">
                                                <span className=" rotate-90">{">"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' '>
                                    <p className='p'>Escolha por qual tipo de propriedade data você deseja ver suas tarefas do dia na “Página Inicial”.</p>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <p className="h4">Cores</p>
                                    <div className='relative'>
                                        <Obj objs={["#ff0000", "#ff0000", "#ff0000", "#ff0000", "+"]} max={2} functionObj={functionBall} color />
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='p'>Escolha sua cor principal, nós geraremos uma cor secundária para você!</p>
                                </div>
                            </div>
                        </div>
                        <div className='h-fit flex items-center justify-between'>
                            <div className='w-[70%] flex flex-col'>
                                <p className='h3 dark:text-white '>Refazer Tutorial </p>
                                <p className='p'>Compreenda perfeitamente todas as funcionalidaades dentro de nosso aplicativo, aproveitando ao máximo seu uso!</p>
                            </div>
                            <div className='bg-primary dark:bg-secondary w-48 h-12 rounded-md flex items-center justify-center'>
                                <p className='p'>Refazer Tutorial</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const InputFieldConfig = ({ type, label, value, onClickTema, onClickSet }: { type: string, label: string, value: string, onClickTema: MouseEventHandler<HTMLInputElement>, onClickSet: MouseEventHandler<HTMLInputElement> }) => (
    <>
        <div className='flex justify-between'>
            <p className="h4">{label}</p>
            <div className="flex items-center font-bold" onClick={onClickTema}>
                <label className="relative w-16 h-8 ml-4 mr-2" >
                    <input type={type} className="opacity-0 w-0 h-0 toggle-input" onClick={onClickSet} />
                    <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider">
                    </span>
                </label>
            </div>
        </div>
        <div className=' pt-3 pb-10'>
            <p className='p'>{value}</p>
        </div>
    </>
);

export const Title = ({ title }: { title: string }) => (
    <>
        <div className='flex justify-between'>
            <p className='h4'>{title}</p>
        </div>
    </>
);
