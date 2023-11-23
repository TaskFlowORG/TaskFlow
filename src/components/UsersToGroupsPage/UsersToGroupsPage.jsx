"use client";

import { FindUser } from "../FindUser"
import { useState, useEffect } from "react"

export const UsersToGroupsPage = () => {
    const [text, setText] = useState([]);
    const [result, setResult] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState([])

    const sendText = () => {
        console.log(text)
        setResult('Texto digitado: ' + text);
        setText("")
    };

    const sendUser = () => {
        console.log('clicou')
        setUser('Usuário: ' + user)
    }
    return (
        <div className="flex w-full ml-24">
            <div className="bg-[#F2F2F2] min-w-[55%] h-[75%] relative">
                <div className="flex flex-col gap-4 mt-12 content-start">
                    <div>
                    <input
                        className="inputSombra pAlata relative"
                        placeholder="Pesquisa"
                        type="text"
                        id="campoTexto"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="absolute w-[60%] h-[7%]" type="button" onClick={sendText}>
                        <img className=" " src="/img/search.svg" />
                    </button>
                    </div>
                    
                    <button className="bg-[#EF4996] h-10 w-[80%] rounded-xl self-center" type="button" onClick={sendUser}>
                        <h1 className="text-[#FCFCFC]">Add User</h1>
                    </button>
                </div>
                {/* Restante do seu código */}
            </div>
        </div>
    );

}