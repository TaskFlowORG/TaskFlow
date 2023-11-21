"use client";
import UserData from "../../services/http/api";

export const PersonalInformations = () => {
    const { name, surname, address, picture, email, phone, description } = UserData();
    return (
        <>
            <div className=" flex  pt-40 justify-center w-full">
                <div className="flex flex-col h-48 gap-10">
                    <div className="flex gap-10 ">
                        <div className=" h-full">
                            <div id="fotoDeUsuario" className=" relative rounded-full bg-slate-500 w-48 h-48">
                                <img className="rounded-full" src={picture} alt="" />
                                <button>
                                    <div className=" border-[#F76858] border-2 rounded-full p-2 bg-white w-12 h-12 absolute -right-1 bottom-3">
                                        <img src="/img/imagem.svg" alt="" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col h-full justify-center gap-4">
                            <div className=" overflow-auto">
                                <h2 className="h2">{name} {surname}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="p">{address}</p>
                                <button>
                                    <div>
                                        <img src="/img/editar.svg" alt="" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center" >
                        <div className="grid grid-cols-2 grid-rows-4 gap-10 absolute">
                            <div className="row-start-1 px-6">
                                <label className="flex flex-col ">
                                    Nome <input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%] rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" placeholder={name} />
                                </label>
                            </div>
                            <div className="row-start-1 px-6">
                                <label className="flex flex-col">
                                    Sobrenome<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="email" placeholder={surname} />
                                </label>
                            </div>
                            <div className="row-start-2  px-6">
                                <label className="flex flex-col">
                                    Email<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="email" placeholder={email} />
                                </label>
                            </div>
                            <div className="row-start-2  px-6">
                                <label className="flex flex-col">
                                    Telefone<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="email" placeholder={phone} />
                                </label>
                            </div>
                            <div className="row-start-3  px-6">
                                <label className="flex flex-col">
                                    Descrição<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="email" placeholder={description} />
                                </label>
                            </div>
                            <div className="row-start-4  px-6">
                                <div>
                                    <button className="h4 w-60  drop-shadow-xl  h-12 rounded-md bg-[#F04A94] text-[#FCFCFC]">Salvar alteraçoes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}