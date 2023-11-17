"use client";
import UserData from "../../services/http/api";

export const PersonalInformations = () => {
    const { username, surname, address, picture, email, phone, description } = UserData();
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
                            <div>
                                <h2 className="h2">{username} {surname}</h2>
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
                    <div>
                        <div className="h-full p">
                            <div className="pb-10 flex flex-row justify-around">
                                <label className="flex flex-col">
                                    Nome <input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%] rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" placeholder={username} />
                                </label>
                                <label className="flex flex-col">
                                    Sobrenome<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md h-12 w-72  pl-4 focus:outline-0" type="text" placeholder={surname} />
                                </label>
                            </div>
                            <div className="pb-10 flex flex-row justify-around">
                                <label className="flex flex-col">
                                    Email<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="email" placeholder={email} />
                                </label>
                                <label className="flex flex-col">
                                    Telefone<input className=" bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" placeholder={phone} />
                                </label>
                            </div>
                            <div>
                                <label className="flex flex-col px-14">
                                    Descrição<input className="w-full bg-[#222222] border-2 border-[#222222] border-opacity-[5%] bg-opacity-[3%]  rounded-md  h-12  pl-4  focus:outline-none" type="text" placeholder={description} />
                                </label>
                            </div>
                            <div className="pt-10 px-14">
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