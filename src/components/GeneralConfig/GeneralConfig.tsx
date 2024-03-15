import { useState } from 'react';
import { useTheme } from "next-themes";

export const GeneralConfig = () => {

    const [toggle, setToggle] = useState(true);
    const { theme, setTheme } = useTheme()

    const mudarTema = () => {
        if (!toggle) {
            setTheme("light");
        }
        else {
            setTheme("dark");
        }
    }

    return (
        <div className="w-full pt-40">
            <div className="flex justify-center h-full items-center ">
                <div className='flex-col w-[55%] h-full'>
                    <div className='pb-20'>
                        <p className="h2 text-secondary">Configurações</p>
                    </div>
                    <div className='flex-col w-[62.5%]'>
                        <div className='flex justify-between'>
                            <p className="h4">Modo escuro</p>
                            <div className="flex items-center font-bold" onClick={() => mudarTema()}>
                                <label className="relative w-16 h-8 ml-4 mr-4" >
                                    <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input" onClick={() => setToggle(!toggle)} />
                                    <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                        <div className='pt-5 pb-10 w-[95%]'>
                            <p className='p'>Ao ativar essa opção você estará mudando o seu tema para escuro, outra forma de fazer isso é no cabeçalho da página pressionando sobre o icone de lua ou sol.</p>
                        </div>
                    </div>

                    <div>
                        <div className='flex-col w-[60%]'>
                            <div className='flex justify-between'>
                                <p className="h4 ">Ajustar fonte</p>
                                <input className='w-min-[50px] w-[300px]' type="range" id='range' />
                            </div>
                            <div className='pt-5 pb-10'>
                                <div className='pb-5'>
                                    <p className='p'>Nessa opção você poderá alterar o tamanho da fonte padrão no site.</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex-col w-[60%]'>
                            <div className='flex justify-between'>
                                <p className="h4 ">Idioma</p>
                                <div className=" h-min w-fit relative">
                                    <select className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary rounded-sm text-primary text-center w-full pr-20">
                                        <option value="Português (Brasil)" key="1" className="w-full ">Português (Brasil)</option>
                                        <option value="Inglês" key="2" className="w-full ">Inglês</option>
                                    </select>
                                    <div className=" border-l-[2px] border-primary -z-[10] w-16 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary font-mono ">
                                        <span className=" rotate-90">{">"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-5 pb-10'>
                                <div className='pb-5'>
                                    <p className='p'>Aqui você pode altera o idioma de sua interface, uma maneira mais simples de fazer isso se encontra também no cabeçalho das paginas onde se encontra alguma bandeira que represente a linguagem atual</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex'>
                    <div className='flex-col flex justify-around gap-10'>
                        <div className='flex justify-center items-center w-64 h-64 bg-white shadow-blur-10'>
                            <div className='flex-col w-[80%] h-[80%]'>
                            <div className='flex justify-center items-center'>
                                    <p className='h4 text-primary pb-6'>Acessibilidade</p>
                                </div>
                                <div className='flex items-center pb-8'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Libras</p>
                                </div>
                                <div className='flex items-center pb-8'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Texto para som</p>
                                </div>
                                <div className='flex items-center'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Descriçao de tarefas</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-64 h-52 bg-white shadow-blur-10'>
                            <div className='flex flex-col w-[80%] h-[80%] '>
                                <div className='flex justify-center items-center'>
                                    <p className='h4 text-primary pb-6'>Conexões</p>
                                </div>
                                <div className='flex items-center pb-8'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Google</p>
                                </div>
                                <div className='flex items-center'>
                                    <input type="checkbox" className=' min-w-[2.2vh] min-h-[2.2vh] w-full h-full' id='configurations' />
                                    <p className='p pl-4'>Github</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-64 h-24 bg-white shadow-blur-10'>
                            <div className=' flex-col w-[70%] h-[55%]'>
                                <div className='rounded-lg bg-primary w-full h-full flex items-center justify-center'>
                                    <p className='p text-white'>Refazer Tutorial</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center w-44 h-90 bg-white shadow-blur-10'>
                        <div className='flex flex-col justify-between w-[55%] h-[87%]'>
                            <div className='rounded-lg w-full h-[11vh] bg-white shadow-blur-10 flex justify-center items-center'>
                                <div className='rounded-full bg-gradient-to-r from-[#AA19C1] via-[#E100F4] to-[#FF7A00] w-[5.5vh] h-[5.5vh]'></div>
                            </div>
                            <div className='rounded-lg w-full h-[11vh] bg-back-grey shadow-blur-10 flex justify-center items-center'>
                                <div className='rounded-full bg-secondary w-[5.5vh] h-[5.5vh]'></div>
                            </div>
                            <div className='rounded-lg w-full h-[11vh] bg-white shadow-blur-10 flex justify-center items-center'>
                                <div className='rounded-full bg-gradient-to-r from-[#AA19C1] via-[#E100F4] to-[#FF7A00] w-[5.5vh] h-[5.5vh]'></div>
                            </div>
                            <div className='rounded-lg w-full h-[11vh] bg-white shadow-blur-10 flex justify-center items-center'>
                                <div className='rounded-full bg-gradient-to-r from-[#AA19C1] via-[#E100F4] to-[#FF7A00] w-[5.5vh] h-[5.5vh]'></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}