"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

export const PermissionUser = ({ group, userId, project }) => {
  const [user, setUser] = useState({});
  const [selectedPermission, setSelectedPermission] = useState("");
  const { theme, setTheme } = useTheme();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId);
      const fetchedPermissions = await getListData("permission");
      setUser(fetchedUser);
      setPermissions(fetchedPermissions);
    };
    getLists();
  }, [userId, group, project]);

  const findPermission = (selectedValue) => {
    setSelectedPermission(selectedValue);
    updatePermission(selectedValue);
  };

  async function updatePermission(selectedValue) {
    try {
      const selectedPermission = permissions.find(permission => permission.name === selectedValue);
      if (!selectedPermission) {
        throw new Error('Permissão selecionada não encontrada.');
      }

      console.log('ID da permissão selecionada:', selectedPermission.id);

      user.permissions = [...user.permissions, selectedPermission];


      await putData("user", user);

      setSelectedPermission("");

      alert('Permissão atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar permissão:', error.message);
      alert('Não foi possível atualizar a permissão do usuário.');
    }
  }

  const userIcon = theme === "dark" ? <img className="" src="/img/whiteIconUser.svg" alt="User" /> : <img className="" src="/img/darkIconUser.svg" alt="User" />;

  const ownerIcon = theme === "dark" ? <img className="mx-auto relative justify-center " src="/img/darkOwner.svg" alt="Owner" /> : <img className="mx-auto" src="/img/whiteOwner.svg" alt="Owner" />

  return (
    <div>
      <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-[#F76858] h-10 md:h-12 lg:h-12 flex items-center justify-between">
        <div className="flex gap-6">
          {userIcon}
          <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black">{user.name}</p>
        </div>
        <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-end lg:justify-between md:justify-between">
          <div className="hidden lg:flex md:flex">
            <p>|</p>
          </div>
          {group.owner && user.username === group.owner.username ? (
            ownerIcon
          ) : (
            <select
              className='selectGroup w-[75%] mnAlata border-none dark:text-[#F76858]'
              name="permission"
              id="permission"
              value={selectedPermission}
              onChange={(e) => findPermission(e.target.value)}
            >
              {user.permission && user.permission.name ? (
                <option value="" disabled>{user.permission.name}</option>
              ) : (
                <option value="" disabled>Permissão</option>
              )}
              {permissions.map(permission => {
                if (permission.project.id === project.id) {
                  return (
                    <option key={permission.name} value={permission.name}>
                      {permission.name}
                    </option>
                  );
                } else {
                  return null;
                }
              })}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};



