"use client";

import { useState, useEffect } from "react";
import { PermissionUser } from "../PermissionUser/PermissionUser";
import { getData, getListData, putData } from "@/services/http/api";

export const UsersList = ({ id = 1 }) => {
    const [text, setText] = useState("");
    const [users, setUsers] = useState("");
    const [usersGroup, setUsersGroup] = useState([]);
    const [newUser, setNewUser] = useState({});

    useEffect(() => {
        const getUsers = async () => {
            const fetchedUsers = await getListData("user");
            console.log("users", fetchedUsers)
            setUsers(fetchedUsers);
        }
        getUsers();

        const getGroupUsers = async () => {
            const fetchedGroupUsers = await getData("group", id);
            console.log("estou aqui", fetchedGroupUsers);
            setUsersGroup(fetchedGroupUsers.users);
        }
        getGroupUsers()
    }, [])

    const filteredUsers = Object.keys(users).filter((key) => key.startsWith("alguma coisa"));

    async function findUser() {
        users.map(u => {
            if (u.name == text) {
                setNewUser(u);
            }
        });
        setText("");
    }

    const addUser = async () => {
        let userExists = false;
    
        for (const u of usersGroup) {
            if (u.id === newUser.id) {
                alert('Este usuário já é um integrante do grupo');
                userExists = true;
                break;
            } else if (!newUser.id) {
                alert('Adicione um usuário válido');
                userExists = true;
                break;
            }
        }
    
        if (!userExists) {
            if (!newUser.groupId) {
                newUser.groupId = id;
            }
            if (!newUser.userId) {
                newUser.usersId = newUser.id;
            }
    
            await putData("group/users/" + id , newUser);
            alert('Usuário adicionado com sucesso');
        }
    
        setNewUser({});
    };
    

    return (
        <div className="flex w-full ml-24 dark:text-[#FCFCFC]">
            <div className="bg-[#F2F2F2] dark:bg-[#333] w-[55%] h-[75%] relative">
                <div className="flex flex-col mt-12 gap-12 justify-between">
                    <div>
                        <input
                            className="inputSombra pAlata"
                            placeholder="Pesquisa"
                            type="text"
                            id="campoTexto"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            className="absolute w-[60%] h-[7%]"
                            type="button"
                            onClick={findUser}
                        >
                            <img className="" src="/img/search.svg" />
                        </button>
                    </div>
                    <div className="self-center w-[80%] flex flex-col gap-6">
                        {usersGroup.map((u) => {
                            return (
                                <PermissionUser key={u.id} userId={u.id} />
                            );

                        })}
                    </div>
                    <button
                        className="groupGrandient dark:groupGrandientDark h-10 w-[80%] rounded-xl self-center"
                        type="button"
                        onClick={addUser}
                    >
                        <h5 className="text-[#FCFCFC]">Add Usuário</h5>
                    </button>
                </div>
            </div>
        </div>
    );
};
