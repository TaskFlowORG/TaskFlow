"use client";
import UserData from "../../services/http/api";

export const PersonalInformations = () => {
    const { name, surname, address, picture, email, phone, description } = UserData();
    return (
        <>
            <div className=" flex  pt-40 justify-center w-full ">
                <div className="flex flex-col h-48 gap-10">
                    <div className="flex gap-10 ">
                        <div className="h-full relative">
                            <div id="fotoDeUsuario" className="relative rounded-full bg-slate-500 w-48 h-48">
                                <img className="rounded-full" src={picture} alt="" />
                                <label className=" border-secondary border-2 rounded-full p-2 bg-white w-12 h-12 absolute -right-1 bottom-3 cursor-pointer">
                                    <img src="/img/imagem.svg" alt="" />
                                    <input className="opacity-0 w-full h-full absolute top-0 left-0" type="file" accept="image/*"/>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col h-full justify-center gap-4 text-modal-grey">
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
                        <div className="grid grid-cols-2 grid-rows-4 gap-10 absolute text-modal-grey p">
                            <div className="row-start-1 px-6">
                                <label className="flex flex-col ">
                                    Nome <input className=" bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none " type="text" placeholder={name} />
                                </label>
                            </div>
                            <div className="row-start-1 px-6">
                                <label className="flex flex-col">
                                    Surname <input className=" bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" placeholder={surname} />
                                </label>
                            </div>
                            <div className="row-start-2  px-6">
                                <label className="flex flex-col">
                                    Email <input className=" bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" placeholder={email} />
                                </label>
                            </div>
                            <div className="row-start-2  px-6">
                                <label className="flex flex-col">
                                    Telefone <input className=" bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" placeholder={phone} />
                                </label>
                            </div>
                            <div className="row-start-3  px-6 col-span-2">
                                <label className="flex flex-col">
                                    Descrição <input className=" bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-full  pl-4 focus:outline-none" type="text" placeholder={description} />
                                </label>
                            </div>
                            <div className="row-start-4  px-6">
                                <div>
                                    <button className="h4 w-60  drop-shadow-xl  h-12 rounded-md bg-primary text-white">Salvar alteraçoes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}