"use client";

import { useState, useEffect } from "react"
import { GroupUsersList } from "../GroupUsersList";
import { getData, getListData } from "@/services/http/api";

export const UsersToGroupPage = ({ id = 1 }) => {
    const [text, setText] = useState([]);
    const [result, setResult] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([])

    useEffect(() => {
        const getListGroup = async () => {
            const fetchedGroupUsers = await getListData("user-group");
            setUsers(fetchedGroupUsers);
        }

        getListGroup();
    }, []);

    const sendText = () => {
        console.log(text)
        useEffect(() => {
            const getUser = async () => {
                const fetchedUser = await getData ("user", text)
                setText(fetchedUser)
            }
        })
        setResult('Texto digitado: ' + text);
        setText("")
    };

    const sendUser = () => {
        console.log('clicou')
        //fazer uma função assíncrona para fazer o put
    }
    console.log("users", users);
    
    return (
        
        <div className="flex w-full ml-24">
            <div className="bg-[#F2F2F2] w-[55%] h-[75%] relative">
                <div className="flex flex-col mt-12 gap-12 justify-between">
                    <div>
                        <input
                            className="inputSombra pAlata"
                            placeholder="Pesquisa"
                            type="text"
                            id="campoTexto"
                            value={text}
                            onChange={(e) => setText(e.target.value)} />
                        <button className="absolute w-[60%] h-[7%]" type="button" onClick={sendText}>
                            <img src="/img/search.svg" />
                        </button>
                    </div>
                    <div className="grid self-center w-[80%] flex flex-col gap-6">
                        {
                            users.map(u => {
                                if(u.groupId == id){
                                    return <GroupUsersList key={u.id} userId={u.userId} />;
                                }
                            })
                        }
                    </div>
                    <button className="bg-[#EF4996] h-10 w-[80%] rounded-xl self-center" type="button" onClick={sendUser}>
                        <h5 className="text-[#FCFCFC]">Add User</h5>
                    </button>
                </div>
            </div>
        </div>
    );

}