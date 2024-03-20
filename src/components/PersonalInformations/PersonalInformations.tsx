"use client"

import { useEffect, useState } from "react";
import { userService } from "@/services";
import { User } from "@/models";

export const PersonalInformations = () => {

    const [user, setUser] = useState<User>();
    const [editingAdress, setEditingAdress] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    useEffect(() => {
        async function getUser() {
            const response = await userService.findByUsername("jonatas");
            setUser(response);
        }
        getUser();
    }, []);

    const mudarEndereco = () => {
        setEditingAdress(!editingAdress);
    };

    const salvarAlterações = async () => {
        const user = new User(
            (await userService.findByUsername("jonatas")).username,
            name || (await userService.findByUsername("jonatas")).name,
            surname || (await userService.findByUsername("jonatas")).surname,
            address || (await userService.findByUsername("jonatas")).address,
            mail || (await userService.findByUsername("jonatas")).mail,
            phone || (await userService.findByUsername("jonatas")).phone,
            desc || (await userService.findByUsername("jonatas")).description,
            (await userService.findByUsername("jonatas")).points,
            (await userService.findByUsername("jonatas")).configuration,
            (await userService.findByUsername("jonatas")).permissions,
        );
        userService.patch(user);
    }

    return (
        <>
            <div className="absolute flex flex-col justify-center w-full h-[70%] items-center">
                <div className="flex flex-col gap-10">
                    <div className="flex gap-10 ">
                        <div className="h-full ">
                            <div id="fotoDeUsuario" className="relative rounded-full bg-slate-500 w-48 h-48">
                                <img className="rounded-full" src="{user.picture}" alt="" />
                                <label className=" border-secondary border-2 rounded-full p-2 bg-white w-12 h-12 absolute -right-1 bottom-3 cursor-pointer">
                                    <img className="w-full h-[80%]" src="/img/imagem.svg" alt="" />
                                    <input id="photo" className="opacity-0 w-full h-full absolute top-0 left-0" type="file" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col h-full justify-center gap-4 text-modal-grey">
                            <div className=" overflow-auto">
                                <h2 className="h2">{user?.name} {user?.surname}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                {editingAdress == true ? <input id="adress" className="shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] 
                                rounded-md h-12 w-72 pl-4 focus:outline-none" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={user?.address} /> : <p className="text-modal-grey">{user?.address}</p>}
                                <button onClick={() => mudarEndereco()}>
                                    <div>
                                        <img src="/img/editar.svg" alt="" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center" >
                        <div className="grid grid-cols-2 grid-rows-4 gap-10 absolute text-modal-grey p">
                            <div className="row-start-1 px-6  ">
                                <label className="flex flex-col ">
                                    Nome <input id="name" className=" shadow-blur-10   bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none " type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={user?.name} />
                                </label>
                            </div>
                            <div className="row-start-1 px-6 ">
                                <label className="flex flex-col">
                                    Sobrenome <input id="surname" className="shadow-blur-10 bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder={user?.surname} />
                                </label>
                            </div>
                            <div className="row-start-2  px-6 ">
                                <label className="flex flex-col">
                                    Email <input id="mail" className="shadow-blur-10  bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" value={mail} onChange={(e) => setMail(e.target.value)} placeholder={user?.mail} />
                                </label>
                            </div>
                            <div className="row-start-2  px-6 ">
                                <label className="flex flex-col">
                                    Telefone <input id="phone" className="shadow-blur-10 bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-72  pl-4 focus:outline-none" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={user?.phone} />
                                </label>
                            </div>
                            <div className="row-start-3  px-6  col-span-2">
                                <label className="flex flex-col">
                                    Descrição <input id="desc" className="shadow-blur-10 bg-input-grey-opacity border-2  border-input-grey border-opacity-[70%]  rounded-md  h-12 w-full  pl-4 focus:outline-none" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={user?.description} />
                                </label>
                            </div>
                            <div className="row-start-4  px-6 ">
                                <div>
                                    <button className="h4 w-60  drop-shadow-xl  h-12 rounded-md bg-primary text-contrast" onClick={() => salvarAlterações()}>Salvar alteraçoes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
