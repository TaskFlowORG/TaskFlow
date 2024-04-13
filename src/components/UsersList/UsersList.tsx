import { useState, useEffect } from "react";
import { PermissionUser } from "../PermissionUser/PermissionUser";
import { getData, getListData, putData } from "@/services/http/api";
import { useTheme } from "next-themes";
import { groupService, userService } from "@/services";
import { Group, GroupPut, OtherUser, Project, User } from "@/models";


interface Props {
  project: Project;
  group: Group;
}

export const UsersList: React.FC<Props> = ({ project, group }) => {
  const [text, setText] = useState<string>("");
  const [newUser, setNewUser] = useState<OtherUser>();
  const [suggestedUsers, setSuggestedUsers] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();

  const findUser = async () =>  {
    setText('');
    const userFind = group?.users.find((u) => u.username.toLowerCase() === text.toLowerCase());
    if (userFind) {
      setNewUser(userFind);
    } else {
      alert("Usuário não encontrado");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setText(query);
    const filteredUsers = group?.users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    let usersName: string[] = []
    filteredUsers.map(u =>{
      usersName.push(u.username)
    })
    setSuggestedUsers(usersName);
  };

  const handleUserSelect = () => {
    setSuggestedUsers([]);
  };

  const addUser = async (user: User) => {
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
      if(group != null){
        newGroup = new GroupPut(group.id, group.name, group.description, group.permissions, group.users);
        group?.users.push(user);
        await groupService.update(newGroup, group.id);
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
      //  onClick={addUser}
      style={{
        backgroundImage: `linear-gradient(to right, ${theme == "dark" ? "var(--secondary-color)" : "var(--primary-color)"} 0%, ${theme == "dark" ? "var(--primary-color)" : "var(--secondary-color)"} 80%)`,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      }}
    >
      <h5 className="text-[#FCFCFC]">Add Usuário</h5>
    </button>
  );

  return (
     <div className="flex w-full justify-center h-full lg:justify-start">
       <div className="bg-[#F2F2F2] dark:bg-[#333] w-80 md:w-96 py-8 lg:py-12 relative">
         <div className="flex flex-col gap-12 justify-between">
           <div>
             <input
               className="pAlata relative left-8 lg:left-12 h-10 w-[80%] rounded-xl px-5 placeholder:border-primary dark:border-secondary"
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
               <img className="" src="/img/search.svg" alt="Search" />
             </button>
             {suggestedUsers.length > 0 && (
               <ul className="absolute z-10 bg-white dark:bg-[#333] border border-gray-300 dark:border-gray-700 w-full mt-2 rounded-md overflow-hidden shadow-md">
                 {suggestedUsers.map((username) => (
                   <li
                     key={username}
                     className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                     onClick={() => handleUserSelect()}
                   >
                     {username}
                   </li>
                 ))}
               </ul>
             )}
           </div>
           <div className="self-center w-[80%] max-h-[330px] overflow-y-scroll none-scrollbar flex flex-col gap-6  " >
             {group?.users.map((u) => (
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
