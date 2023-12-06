"use client";

import { useState, useEffect } from "react";
import { UsersGroupList } from "../UsersGroupList/UsersGroupList";
import { getData, getListData, putData } from "@/services/http/api";

export const UsersToGroupPage = ({ id = 1 }) => {
    const [text, setText] = useState("");
    const [users, setUsers] = useState("");
    const [project, setProject] = useState("");
    const [usersGroup, setUsersGroup] = useState([]);
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

    useEffect(() => {
        console.log(isAdd);
    }, [isAdd]);

    const filteredUsers = Object.keys(users).filter((key) => key.startsWith("alguma coisa"));

    async function findUser() {
        console.log("pessoa do projeto", project)
        console.log(usersGroup)
        users.map(u => {
            if (u.name == text) {
                setUserToAdd(u);
            }
        });
        setText("");
    }

    const addUser = async () => {
        let userExists= false;

        for (const u of usersGroup) {
            if (u.id === userToAdd.id) {
                alert('Este usuário já é um integrante do grupo');
                setIsAdd(true, () => {
                    console.log(isAdd);
                });

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
                userToAdd.usersId = userToAdd.id;
            }

            await putData("group/users/" + id, userToAdd);
            alert('Usuário adicionado com sucesso');
        }
        setIsAdd(false, () => {
            console.log(isAdd);
        });
        setUserToAdd({});
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
                                <UsersGroupList key={u.id} userId={u.id} />
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
