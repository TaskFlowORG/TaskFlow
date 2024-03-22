"use client"

import { ChangeEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { userService } from "@/services";
import { User } from "@/models";
import Image from "next/image";

export const PersonalInformations = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editingAddress, setEditingAddress] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [extenderBotaoDel, setExtenderBotaoDel] = useState(false);
    const photoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function getUser() {
            const response = await userService.findByUsername("Marquardt");
            setUser(response);
        }
        getUser();
    }, []);

    const handlePhotoChange = () => {
        if (photoInputRef.current?.files && photoInputRef.current.files.length > 0) {
            const file = photoInputRef.current.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (file.size > 1000000) {
                    alert("A imagem deve ter no máximo 1MB");
                    return;
                }
                console.log(file.size);
                setPhotoUrl(reader.result as string);

            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEditingAddress = () => {
        setEditingAddress(!editingAddress);
    };

    const deleteUser = (username: string) => {
        var sla = confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.");
        if (sla == true) {
            userService.delete(username);
        }
    }

    const saveChanges = async () => {
        const updatedUser = new User(
            (await userService.findByUsername("Marquardt")).username,
            name || (await userService.findByUsername("Marquardt")).name,
            surname || (await userService.findByUsername("Marquardt")).surname,
            address || (await userService.findByUsername("Marquardt")).address,
            mail || (await userService.findByUsername("Marquardt")).mail,
            phone || (await userService.findByUsername("Marquardt")).phone,
            desc || (await userService.findByUsername("Marquardt")).description,
            (await userService.findByUsername("Marquardt")).points,
            (await userService.findByUsername("Marquardt")).configuration,
            (await userService.findByUsername("Marquardt")).permissions
        );
        userService.patch(updatedUser);
    };

    return (
        <div className=" flex flex-col justify-center w-full h-full items-center">
            <div className="flex flex-col justify-center items-center gap-10 w-full ">
                <div className="flex gap-10 w-[60%] ">
                    <div className="h-full">
                        <div id="fotoDeUsuario" className="relative rounded-full bg-slate-500 w-48 h-48">
                            {photoUrl ? (
                                <Image fill className="rounded-full w-full h-full" src={photoUrl} alt="foto" />
                            ) : (
                                null
                            )}
                            <label className="border-secondary border-[1.5px] rounded-full p-2 bg-white dark:bg-back-grey w-12 h-12 absolute -right-1 bottom-3 cursor-pointer">
                                <div className="flex items-center justify-center w-full h-full">
                                    <Image width={30} height={30} src="/img/imagem.svg" alt="" />
                                </div>
                                <input
                                    ref={photoInputRef}
                                    id="photo"
                                    className="opacity-0 w-full h-full absolute top-0 left-0"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col h-full justify-center gap-4 text-modal-grey ">
                        <div className="overflow-auto">
                            <h2 className="h2 text-modal-grey dark:text-white">{user?.name} {user?.surname}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {editingAddress ? (
                                <InputFieldConfig type={"text"} id={"address"} label={""} value={address} onChange={(e: { target: { value: SetStateAction<string> } }) => setAddress(e.target.value)} placeholder={user?.address || ""} ></InputFieldConfig>
                            ) : (
                                <p className="text-modal-grey dark:text-white">{user?.address}</p>
                            )}
                            <button onClick={toggleEditingAddress}>
                                <div>
                                    <Image width={25} height={25} src="/img/editar.svg" alt="" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-[60%] grid grid-cols-2 grid-rows-4 absolute text-modal-grey p ">
                        <InputFieldConfig type={"text"} id={"name"} label={"Nome"} value={name} onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)} placeholder={user?.name || ""} ></InputFieldConfig>
                        <InputFieldConfig type={"text"} id={"surname"} label={"Sobrenome"} value={surname} onChange={(e: { target: { value: SetStateAction<string> } }) => setSurname(e.target.value)} placeholder={user?.surname || ""} ></InputFieldConfig>
                        <InputFieldConfig type={"mail"} id={"mail"} label={"Email"} value={mail} onChange={(e: { target: { value: SetStateAction<string> } }) => setMail(e.target.value)} placeholder={user?.mail || ""} ></InputFieldConfig>
                        <InputFieldConfig type={"tel"} id={"phone"} label={"Telefone"} value={phone} onChange={(e: { target: { value: SetStateAction<string> } }) => setPhone(e.target.value)} placeholder={user?.phone || ""} ></InputFieldConfig>
                        <label className="px-6 flex flex-col w-[200%]">
                            Descrição <textarea
                                className={`dark:text-white resize-none  shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full h-[10vh]  pl-4 py-3 focus:outline-none`}
                                id="desc"

                                value={desc}
                                spellCheck={true}
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setDesc(e.target.value)}
                                placeholder={user?.description || ""}
                            />
                        </label>
                        <div className="row-start-4 flex">
                            <div className="px-6 flex items-center">
                                <button className=" h4 w-60 drop-shadow-xl h-12 rounded-md bg-primary dark:bg-secondary text-contrast" onClick={saveChanges}>Salvar alterações</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="absolute bottom-5 right-0  flex-row-reverse px-6 flex items-center w-[37%]">
                    <div onClick={() => deleteUser("Marquardt")} onMouseEnter={() => { setExtenderBotaoDel(true) }} onMouseLeave={() => { setExtenderBotaoDel(false) }}
                        className={`cursor-pointer flex items-center justify-around h4 w-12 drop-shadow-xl h-12 rounded-md text-contrast ${extenderBotaoDel ? "w-[30%] bg-primary" : "w-10"}`}>
                        <Image width={25} height={25} className="" src="/img/Trash.svg" alt="excluir"></Image>
                        {extenderBotaoDel ? <p className="whitespace-nowrap p">Deletar conta</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

const InputFieldConfig = ({ id, label, type, value, onChange, placeholder }: { id: string, label: string, type: string, value: string, onChange: ChangeEventHandler<HTMLInputElement>, placeholder: string }) => {

    return (
        <div className="px-6 w-full">
            <label className="flex flex-col w-full dark:text-white">
                {label} <input
                    className={`shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full pl-4 focus:outline-none h-12`}
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </label>
        </div>
    )
}