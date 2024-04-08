import Image from "next/image";
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { userService } from "@/services";
import { User, UserPut } from "@/models";
import { InputFieldConfig } from "./components/InputFieldConfig";
import { DeleteAccountModal } from "./components/DeleteAccountModal";
import { archiveToSrc } from "@/functions";
import { CenterModal } from "../Modal";

export const PersonalInformations = () => {
    const [user, setUser] = useState<User>();
    const [editingAddress, setEditingAddress] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");
    const [extenderBotaoDel, setExtenderBotaoDel] = useState(false);
    const [deletarModal, setDeletarModal] = useState(false);

    const [photo, setPhoto] = useState<File>();
    const fotoAindaNaoAtualizada = useRef<HTMLInputElement>(null);
    const [photoUrl, setPhotoUrl] = useState<string>("");

    useEffect(() => {
        async function getUser() {
            const usuario = await userService.findByUsername("jonatas");
            setUser(usuario);
            setName(usuario.name)
            setSurname(usuario.surname)
            setAddress(usuario.address)
            setMail(usuario.mail)
            setPhone(usuario.phone)
            setDesc(usuario.description)
            setPhotoUrl(archiveToSrc(usuario.picture))
        }
        getUser();
    }, []);

    const toggleEditingAddress = () => {
        setEditingAddress(!editingAddress);
    };

    useEffect(() => {
        setPhotoUrl(archiveToSrc(user?.picture));
    }, [user]);

    const saveChanges = async () => {
        const updatedUser = new UserPut((await userService.findByUsername("jonatas")).username, name, surname, address, mail, phone, desc, user!.configuration, undefined)
        userService.patch(updatedUser);
        //Precisa corrigir para o put de user receber uma imagem junto
        //userService.upDatePicture(photo, updatedUser.username)
    };

    useEffect(() => {
        if (!editingAddress) {
            setAddress(address);
        }
    }, [editingAddress, user]);

    const previewDaFoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setPhoto(e.target.files[0]);
        setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (

        <div className=" flex w-full h-full items-center">
            <div className="flex flex-col justify-start items-center gap-10 w-full h-[57rem] py-20">
                <div className="flex gap-10 lg:w-[60%] w-full px-6 lg:px-0">
                    <div className="h-full">
                        <div id="fotoDeUsuario" className="relative rounded-full bg-slate-500 lg:w-48 lg:h-48 w-28 h-28">
                            <Image fill className="rounded-full w-full h-full" src={photoUrl} alt="foto" />
                            <label className="border-primary dark:border-secondary border-[1.5px] rounded-full p-2 bg-white dark:bg-back-grey  lg:w-12 lg:h-12 w-8 h-8 absolute -right-1 bottom-3 cursor-pointer">
                                <div className="flex items-center justify-center w-full h-full">
                                    <Image width={30} height={30} src="/img/imagem.svg" alt="" />
                                </div>
                                <input
                                    ref={fotoAindaNaoAtualizada}
                                    id="photo"
                                    className="opacity-0 w-full h-full absolute top-0 left-0"
                                    type="file"
                                    accept="image/*"
                                    onChange={previewDaFoto}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full justify-center item gap-4 text-modal-grey ">
                        <div className="overflow-auto lg:text-[48px] text-[24px] font-alata">
                            <h2 className=" text-modal-grey dark:text-white">{name} {surname}</h2>
                        </div>
                        <div className="flex">
                            {editingAddress ? (<InputFieldConfig type="text" id="address" label="" value={address} placeholder={address}
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setAddress(e.target.value)} />) :
                                (
                                    <p className={`flex items-center dark:text-white text-dark bg-transparent w-full pl-[42px] focus:outline-none h-12`}>{address}</p>
                                )}
                            <button onClick={toggleEditingAddress}>
                                <div>
                                    <Image width={25} height={25} src="/img/editar.svg" alt="" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full h-full">
                    <div className="lg:w-[60%] w-full h-full lg:grid lg:grid-cols-2 lg:grid-rows-4 flex flex-col justify-between text-modal-grey p">
                        <InputFieldConfig type={"text"} id={"name"} label={"Nome"} value={name} onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)} placeholder={user?.name || ""} ></InputFieldConfig>
                        <InputFieldConfig type={"text"} id={"surname"} label={"Sobrenome"} value={surname} onChange={(e: { target: { value: SetStateAction<string> } }) => setSurname(e.target.value)} placeholder={user?.surname || ""} ></InputFieldConfig>
                        <InputFieldConfig type={"mail"} id={"mail"} label={"Email"} value={mail} onChange={(e: { target: { value: SetStateAction<string> } }) => setMail(e.target.value)} placeholder={user?.mail || ""} ></InputFieldConfig>
                        <InputFieldConfig type={"tel"} id={"phone"} label={"Telefone"} value={phone} onChange={(e: { target: { value: SetStateAction<string> } }) => setPhone(e.target.value)} placeholder={user?.phone || ""} ></InputFieldConfig>
                        <label className="px-6 flex flex-col lg:w-[200%] w-full text-modal-grey dark:text-white">
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
                            <div className="px-6 flex items-center h-20">
                                <button className=" h4 w-60 drop-shadow-xl h-12 rounded-md bg-primary dark:bg-secondary text-contrast" onClick={saveChanges}>Salvar alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="z-[3] absolute lg:bottom-5 bottom-[6.5rem] right-0  flex-row-reverse px-6 flex items-center lg:w-[37%]">
                    <div onClick={() => setDeletarModal(true)} onMouseEnter={() => { setExtenderBotaoDel(true) }} onMouseLeave={() => { setExtenderBotaoDel(false) }}
                        className={`cursor-pointer flex items-center justify-around h4 w-12 drop-shadow-xl h-12 rounded-md text-contrast ${extenderBotaoDel ? "lg:w-[30%] lg:bg-primary lg:dark:bg-secondary" : "w-10"}`}>
                        <Image width={25} height={25} className="" src="/img/Trash.svg" alt="excluir"></Image>
                        {extenderBotaoDel ? <p className="whitespace-nowrap p lg:block hidden">Deletar conta</p> : null}
                    </div>
                    <CenterModal condition={deletarModal} setCondition={setDeletarModal}  >
                        <DeleteAccountModal close={() => setDeletarModal(false)} deleteUser={() => userService.delete("jonatas")} />
                    </CenterModal>
                </div>
            </div>
        </div>
    )
}