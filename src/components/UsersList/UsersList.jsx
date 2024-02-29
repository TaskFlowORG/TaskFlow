"use client";

import { useState, useEffect } from "react";
import { PermissionUser } from "../PermissionUser/PermissionUser";
import { getData, getListData, putData } from "@/services/http/api";
import { useTheme } from "next-themes";

export const UsersList = ({ project, groupId = 1 }) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [usersGroup, setUsersGroup] = useState([]);
  const [group, setGroup] = useState({});
  const [newUser, setNewUser] = useState({});
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getListData("user");
        setUsers(fetchedUsers);
        const fetchedGroup = await getData("group", groupId);
        setGroup(fetchedGroup);
        const groupUsers = fetchedGroup.users;
        const ownerIndex = groupUsers.findIndex(user => user.username === fetchedGroup.owner.username);

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

    const intervalId = setInterval(fetchData, 7000);

    fetchData();

    return () => clearInterval(intervalId);
  }, [groupId]);

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
    if (Object.keys(newUser).length === 0) {
      alert("Adicione um usuário válido");
      return;
    }

    const userExists = group.users.some((u) => u.username === newUser.username);
    if (userExists) {
      alert("Este usuário já é um integrante do grupo");
      return;
    }

    try {
      const updatedUsersGroup = [newUser, ...usersGroup];
      setUsersGroup(updatedUsersGroup);
      await putData("group", { ...group, users: updatedUsersGroup });
    } catch (error) {
      console.error("Error adding user to group:", error);
    }

    setNewUser({});
  };

  const combinedOnChange = (e) => {
    handleSearchChange(e);
    setText(e.target.value);
  };

  const addButtonClassName = theme === "dark" ? "groupGrandient" : "groupGrandientDark";

  const addButton = (
    <button
      className={`${addButtonClassName} h-10 w-[80%] rounded-xl self-center`}
      type="button"
      onClick={addUser}
    >
      <h5 className="text-[#FCFCFC]">Add Usuário</h5>
    </button>
  );

  return (
    <div className="flex w-full justify-center lg:justify-start md:justify-start dark:text-[#FCFCFFC]">
      <div className="bg-[#F2F2F2] dark:bg-[#333] w-80 h-[109%] lg:w-[60%] lg:h-[75%] relative">
        <div className="flex flex-col mt-12 gap-12 justify-between">
          <div className="">
            <input
              className="pAlata relative left-8 lg:left-12 h-10 w-[80%] rounded-xl px-5 py-1"
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
                    key={user.username}
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
                group={group}
                userId={u.username}
                project={project}
                key={u.username}
              />
            ))}
          </div>
          {addButton}
        </div>
      </div>
    </div>
  );
};
