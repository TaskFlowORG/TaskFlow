"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

export const PermissionUser = ({ groupId, userId, project }) => {
  const [user, setUser] = useState({});
  const [selectedPermission, setSelectedPermission] = useState("");
  const [group, setGroup] = useState([]);
  const { theme, setTheme } = useTheme();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId);
      const fetchedGroup = await getData("group", groupId);
      const fetchedPermissions = await getListData("permission");
      setUser(fetchedUser);
      setGroup(fetchedGroup);
      setPermissions(fetchedPermissions);
    };
    getLists();
  }, [userId, groupId, project]);

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

      user.permissions = [...user.permissions,  selectedPermission];


      await putData("user", user);

      setSelectedPermission("");

      alert('Permissão atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar permissão:', error.message);
      alert('Não foi possível atualizar a permissão do usuário.');
    }
  }

  let userIcon = null;
  if (theme === "dark") {
    userIcon = <img className="" src="/img/whiteIconUser.svg" alt="User" />;
  } else {
    userIcon = <img className="" src="/img/darkIconUser.svg" alt="User" />
  }

  let ownerIcon = null;
  if (theme === "dark") {
    ownerIcon = <img className="mx-auto " src="/img/darkOwner.svg" alt="Owner" />
  } else {
    ownerIcon = <img className="mx-auto" src="/img/whiteOwner.svg" alt="Owner" />
  }

  return (
    <div>
      <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-[#F76858] h-12 flex items-center justify-between">
        <div className="flex gap-6">
          {userIcon}
          <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black">{user.name}</p>
        </div>
        <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-between">
          <p>|</p>
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



