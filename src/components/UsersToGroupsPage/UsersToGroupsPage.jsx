"use client";

import { FindUser } from "../FindUser"

import { useState, useEffect } from "react"

export const UsersToGroupsPage = () => {
    const [text, setText] = useState([]);
    const [result, setResult] = useState([]);
    const [user, setUser] = useState([]);

    const sendText = () => {
        // Atualiza o estado 'resultado' com o texto digitado
        console.log(text)
        setResult('Texto digitado: ' + text);
        setText("")
    };

    const sendUser = () =>{
        setUser('Usuário: ' + user)
    }

    return (
        <div className="flex w-full">
            <div className="bg-[#F2F2F2] min-w-[45%] h-2/3 relative">
                <div className="flex flex-col">
                    <div className="w-full flex gap-4 absolute self-center mt-12 ">
                        <input
                            className="inputSombra pAlata"
                            placeholder="Pesquisa"
                            type="text"
                            id="campoTexto"
                            value={text}
                            onChange={(e) => setText(e.target.value)} />
                        <button type="button" onClick={sendText}>
                            <img className="flex absolute right-14 bottom-2" src="/img/search.svg" />
                        </button>
                    </div>
                    <div>
                        <FindUser />
                        {/* usuarios */}
                    </div>
                    <div className="flex">
                        <button type="button" onClick={sendUser}>Add User</button>

                    </div>
                </div>
            </div>
        </div>
    )
}