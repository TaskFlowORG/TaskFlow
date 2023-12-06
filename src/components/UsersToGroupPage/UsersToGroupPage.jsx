"use client";

import { useState, useEffect } from "react";
import { GroupUsersList } from "../GroupUsersList";
import { getData, getListData, putData } from "@/services/http/api";
import { Permission } from "@/model/Permission";


export const UsersToGroupPage = ({ id = 1 }) => {
    const [text, setText] = useState("");
    const [users, setUsers] = useState("");
    const [project, setProject] = useState("");
    const [groupUsers, setGroupUsers] = useState([]);
    const [userToAdd, setUserToAdd] = useState({});
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        const getProjects = async () => {
            const fetchedProjects = await getListData("project")
            setProject(fetchedProjects);
        }
        getProjects()
        const getUsers = async () => {
            const fetchedUsers = await getListData("user");
            setUsers(fetchedUsers);
        }
        getUsers();

        const getListGroup = async () => {
            const fetchedGroupUsers = await getListData("group/users/" +id
            );
            setGroupUsers(fetchedGroupUsers);
        }
        getListGroup();
    }, [])

    useEffect(() => {
        console.log(isAdd);
    }, [isAdd]);

    const filteredUsers = Object.keys(users).filter((key) => key.startsWith("alguma coisa"));

    async function findUser() {
        console.log(groupUsers)
        users.map(u => {
            if (u.name == text) {
                setUserToAdd(u, u.group = id);
            }
        });
        setText("");
    }

    const addUser = async () => {
        let userExists = false;

        for (const u of groupUsers) {
            if (u.userId === userToAdd.id) {
                alert('Este usuário já é um integrante do grupo');
                setIsAdd(true, () => {
                    console.log(isAdd);
                });
                userExists = true;
                break;
            } else if (!userToAdd.id) {
                alert('Adicione um usuário válido');
                setIsAdd(true, () => {
                    console.log(isAdd);
                });
                userExists = true;
                break;
            }
        }

        if (!isAdd) {
            if (!userToAdd.groupId) {
                userToAdd.groupId = id;
            }
            if (!userToAdd.userId) {
                userToAdd.userId = userToAdd.id;
            }

            await putData("group/users/" + id, userToAdd);
            alert('Usuário adicionado com sucesso');
        }
        setIsAdd(false, () => {
            console.log(isAdd);
        });
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
                        {groupUsers.map((u) => {
                            if (u.group === id) {
                                return (
                                    <GroupUsersList key={u.id} userId={u.userId} />
                                );
                            }
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
