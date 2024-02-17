"use client";

import { useState, useEffect } from "react";
import { PermissionUser } from "../PermissionUser/PermissionUser";
import { getData, getListData, putData } from "@/services/http/api";

export const UsersList = ({ id = 1, projectId }) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [usersGroup, setUsersGroup] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getListData("user");
        setUsers(fetchedUsers);

        const fetchedGroup = await getData("group", id);
        const groupUsers = fetchedGroup.users;
        const ownerIndex = groupUsers.findIndex(user => user.id === fetchedGroup.owner.id);

        if (ownerIndex !== -1) {
          groupUsers.splice(ownerIndex, 1);
          setUsersGroup([fetchedGroup.owner, ...groupUsers]);
        } else {
          setUsersGroup(groupUsers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    fetchData();

    return () => clearInterval(intervalId);
  }, [id]);

  const findUser = () => {
    setText('');
    const user = users.find((u) => u.username.toLowerCase() === text.toLowerCase());
    if (user) {
      setNewUser(user);
    } else {
      alert("Usuário não encontrado");
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setText(query);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    setSuggestedUsers(filteredUsers);
  };

  const handleUserSelect = (user) => {
    setText(user.username);
    setSuggestedUsers([]);
  };

  const addUser = async () => {
    if (!newUser.id) {
      alert("Adicione um usuário válido");
      return;
    }

    const userExists = usersGroup.some((u) => u.id === newUser.id);
    if (userExists) {
      alert("Este usuário já é um integrante do grupo");
      return;
    }

    const updatedUsersGroup = [newUser, ...usersGroup];
    setUsersGroup(updatedUsersGroup);
    try {
      await putData("group/user/" + id, newUser);
    } catch (error) {
      console.error("Error adding user to group:", error);
    }
    setNewUser({});
  };

  const combinedOnChange = (e) => {
    handleSearchChange(e);
    setText(e.target.value);
  };

  return (
    <div className="flex w-full ml-24 dark:text-[#FCFCFFC]">
      <div className="bg-[#F2F2F2] dark:bg-[#333] w-[55%] h-[75%] relative">
        <div className="flex flex-col mt-12 gap-12 justify-between">
          <div>
            <input
              className="inputSombra pAlata"
              placeholder="Pesquisa"
              type="text"
              id="campoTexto"
              value={text}
              onChange={combinedOnChange}
            />
            {suggestedUsers.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-[#333] border border-gray-300 dark:border-gray-700 w-full mt-2 rounded-md overflow-hidden shadow-md">
                {suggestedUsers.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="absolute w-[60%] h-[7%]"
              type="button"
              onClick={findUser}
            >
              <img className="" src="/img/search.svg" />
            </button>
          </div>
          <div className="self-center w-[80%] max-h-[330px] overflow-y-auto flex flex-col gap-6">
            {usersGroup.map((u) => (
              <PermissionUser
                groupId={id}
                userId={u.id}
                projectId={projectId}
                key={u.id}
              />
            ))}
          </div>
          <button
            className="groupGrandient content-end dark:groupGrandientDark h-10 w-[80%] rounded-xl self-center"
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



