import { useState } from 'react';
import { Select } from "@/components/Select"

export const GeneralConfig = () => {

    const [toggle] = useState(true);

    return (
        <div className="w-full pt-40">
            <div className="flex justify-center h-full items-center">
                <div className='flex-col w-[55%] h-full '>
                    <div className='pb-20'>
                        <p className="h2 text-secondary">Configurações</p>
                    </div>
                    <div className='flex-col w-[62.5%]'>
                        <div className='flex justify-between'>
                            <p className="h4 text-black">Modo escuro</p>
                            <div className="flex items-center font-bold">
                                <label className="relative w-16 h-8 ml-4 mr-4">
                                    <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input" disabled={!toggle} />
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
                                <p className="h4 text-black">Ajustar fonte</p>
                                <div className=" h-min w-fit relative">
                                    <select className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary rounded-sm text-primary text-center w-full pr-20">
                                        <option value="100% (Recomendado)" key="1" className="w-full ">100% (Recomendado)</option>
                                        <option value="75%" key="2" className="w-full ">75%</option>
                                        <option value="50%" key="3" className="w-full ">50%</option>
                                    </select>
                                    <div className=" border-l-[2px] border-primary -z-[10] w-16 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary font-mono ">
                                        <span className=" rotate-90">{">"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-5 pb-10'>
                                <div className='pb-5'>
                                    <p className='p'>Nessa opção você poderá alterar o tamanho da fonte padrão no site.</p>
                                </div>
                                <input type="range" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex-col w-[60%]'>
                            <div className='flex justify-between'>
                                <p className="h4 text-black">Ajustar fonte</p>
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
                <div className='flex-col'>

                </div>
            </div>

        </div>
    )
}  