"use client"

import { ChangeEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { userService } from "@/services";
import { User } from "@/models";

export const PersonalInformations = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editingAddress, setEditingAddress] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");
    const photoInputRef = useRef<HTMLInputElement>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        async function getUser() {
            const response = await userService.findByUsername("jonatas");
            setUser(response);
        }
        getUser();
    }, []);

    const handlePhotoChange = () => {
        if (photoInputRef.current?.files && photoInputRef.current.files.length > 0) {
            const file = photoInputRef.current.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEditingAddress = () => {
        setEditingAddress(!editingAddress);
    };

    const saveChanges = async () => {
        const updatedUser = new User(
            (await userService.findByUsername("jonatas")).username,
            name || (await userService.findByUsername("jonatas")).name,
            surname || (await userService.findByUsername("jonatas")).surname,
            address || (await userService.findByUsername("jonatas")).address,
            mail || (await userService.findByUsername("jonatas")).mail,
            phone || (await userService.findByUsername("jonatas")).phone,
            desc || (await userService.findByUsername("jonatas")).description,
            (await userService.findByUsername("jonatas")).points,
            (await userService.findByUsername("jonatas")).configuration,
            (await userService.findByUsername("jonatas")).permissions
        );
        userService.patch(updatedUser);
    };

    return (
        <div className=" flex flex-col justify-center w-full h-full items-center">
            <div className="flex flex-col gap-10">
                <div className="flex gap-10">
                    <div className="h-full">
                        <div id="fotoDeUsuario" className="relative rounded-full bg-slate-500 w-48 h-48">
                            {photoUrl ? (
                                <img className="rounded-full w-full h-full" src={photoUrl} alt="" />
                            ) : (
                                <img className="rounded-full" alt="" />
                            )}
                            <label className="border-secondary border-2 rounded-full p-2 bg-white w-12 h-12 absolute -right-1 bottom-3 cursor-pointer">
                                <img className="w-full h-[80%]" src="/img/imagem.svg" alt="" />
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

                    <div className="flex flex-col h-full justify-center gap-4 text-modal-grey">
                        <div className="overflow-auto">
                            <h2 className="h2">{user?.name} {user?.surname}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {editingAddress ? (
                                <InputFieldConfig type={"text"} id={"address"} label={""} value={address} onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)} placeholder={user?.address || ""} ></InputFieldConfig>
                            ) : (
                                <p className="text-modal-grey">{user?.address}</p>
                            )}
                            <button onClick={toggleEditingAddress}>
                                <div>
                                    <img src="/img/editar.svg" alt="" />
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
                                className={` resize-none  shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full h-[20vh] pl-4 focus:outline-none`}
                                id="desc"
                                value={desc}
                                spellCheck={true}
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setDesc(e.target.value)}
                                placeholder={user?.description || ""}
                            />
                        </label>
                        <div className="px-6 flex items-center row-start-4 ">
                            <button className=" h4 w-60 drop-shadow-xl h-12 rounded-md bg-primary text-contrast" onClick={saveChanges}>Salvar alterações</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const InputFieldConfig = ({ id, label, type, value, onChange, placeholder }: { id: string, label: string, type: string, value: string, onChange: ChangeEventHandler<HTMLInputElement>, placeholder: string }) => {

    return (
        <div className="px-6 w-full">
            <label className="flex flex-col w-full">
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
