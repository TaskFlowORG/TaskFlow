import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { groupService, userService } from "@/services";
import { Group, GroupPut, OtherUser, Project, User } from "@/models";
import { PermissionUser } from "../PermissionUser";

interface Props {
  project: Project;
  group: Group | undefined;
}

export const UsersList: React.FC<Props> = ({ project, group }) => {
  const [text, setText] = useState<string>("");
  const [newUser, setNewUser] = useState<OtherUser>();
  const [suggestedUsers, setSuggestedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<OtherUser[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, [project.id]);

  const fetchData = async () => {
    const fetchedUsers = await userService.findAll();
    setUsers(fetchedUsers)
  };

  const findUser = async () => {
    const userFind = users.find((u) => u.username.toLowerCase() === text.toLowerCase());
    console.log("grupo", group?.users);

    console.log(userFind);

    if (userFind) {
      setNewUser(userFind);
    } else {
      alert("Usuário não encontrado");
    }
    setText('');
    setShowSuggestions(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setText(query);

    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    let usersName: string[] = [];
    if (filteredUsers != null) {
      filteredUsers.map(u => {
        usersName.push(u.username)
      });
      setSuggestedUsers(usersName);
    }
    setShowSuggestions(true);
  };

  const handleUserSelect = () => {
    setShowSuggestions(false);
  };

  const verifyUser = () => {
    if (newUser == null) {
      alert("Usuário inválido")
    } else {
      addUser(newUser)
    }
  }

  const addUser = async (user: OtherUser) => {
    if (Object.keys(user).length === 0) {
      alert("Adicione um usuário válido");
      return;
    }

    const userExists = group?.users.some((u) => u.username === user.username);
    if (userExists) {
      alert("Este usuário já é um integrante do grupo");
      return;
    }

    try {
      let newGroup;
      if (group != null) {
        await groupService.inviteUser(group.id, user.id);
        fetchData();
      }
    } catch (error) {
      console.error("Error adding user to group:", error);
    }
  };

  const combinedOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e);
    setText(e.target.value);
  };

  const addButton = (
    <button
      className={`h-10 w-[80%] rounded-xl self-center`}
      type="button"
      onClick={() => verifyUser()}
      style={{
        backgroundImage: `linear-gradient(to right, ${theme == "dark" ? "var(--secondary-color)" : "var(--primary-color)"} 0%, ${theme == "dark" ? "var(--primary-color)" : "var(--secondary-color)"} 80%)`,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      }}
    >
      <h5 className="text-[#FCFCFC]">Adicionar Usuário</h5>
    </button>
  );

  return (
    <div className="flex w-full justify-center h-full lg:justify-start">
      <div className="bg-[#F2F2F2] dark:bg-[#333] w-80 md:w-96 py-8 lg:py-12 relative">
        <div className="flex flex-col gap-12 justify-between">
          <div>
            <input
              ref={inputRef}
              className="pAlata relative left-8 lg:left-12 h-10 w-[80%] dark:bg-[#3C3C3C] rounded-xl px-5 placeholder:border-primary dark:border-secondary"
              placeholder="Pesquisa"
              type="text"
              id="campoTexto"
              value={text}
              onChange={combinedOnChange}
            />
            <button
              className="relative"
              type="button"
              onClick={findUser}
            >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50" fill="currentColor" className="text-primary dark:text-white stroke-none">
                  <path d="M46.1111 50L28.6111 32.5C27.2222 33.6111 25.625 34.4907 23.8194 35.1389C22.0139 35.787 20.0926 36.1111 18.0556 36.1111C13.0093 36.1111 8.73889 34.363 5.24444 30.8667C1.75 27.3704 0.00185185 23.1 0 18.0556C0 13.0093 1.74815 8.73889 5.24444 5.24444C8.74074 1.75 13.0111 0.00185185 18.0556 0C23.1019 0 27.3722 1.74815 30.8667 5.24444C34.3611 8.74074 36.1093 13.0111 36.1111 18.0556C36.1111 20.0926 35.787 22.0139 35.1389 23.8194C34.4907 25.625 33.6111 27.2222 32.5 28.6111L50 46.1111L46.1111 50ZM18.0556 30.5556C21.5278 30.5556 24.4796 29.3398 26.9111 26.9083C29.3426 24.4769 30.5574 21.5259 30.5556 18.0556C30.5556 14.5833 29.3398 11.6315 26.9083 9.2C24.4769 6.76852 21.5259 5.5537 18.0556 5.55556C14.5833 5.55556 11.6315 6.7713 9.2 9.20278C6.76852 11.6343 5.5537 14.5852 5.55556 18.0556C5.55556 21.5278 6.7713 24.4796 9.20278 26.9111C11.6343 29.3426 14.5852 30.5574 18.0556 30.5556Z" />
                </svg>
              </div>
            </button>
            {showSuggestions && suggestedUsers.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-[#333] border border-gray-300 dark:border-gray-700 w-full mt-2 rounded-md overflow-hidden shadow-md">
                {suggestedUsers.map((username) => (
                  <li
                    key={username}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setText(username);
                      handleUserSelect();
                    }}
                  >
                    {username}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="self-center w-[80%] max-h-[330px] overflow-y-scroll none-scrollbar flex flex-col gap-6" >
            {/* <PermissionUser
              group={group}
              user={group?.owner && group.owner.username} // Verifique se group.owner existe antes de acessar username
              project={project}
              key={group?.owner && group.owner.username} // Verifique se group.owner existe antes de usar username como chave
            /> */}

            {
              group?.users.map((u) => (
                <PermissionUser
                  group={group}
                  user={u}
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
