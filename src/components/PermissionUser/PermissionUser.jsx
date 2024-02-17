"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

export const PermissionUser = ({ groupId, userId, projectId }) => {
  const [user, setUser] = useState({});
  const [selectedPermission, setSelectedPermission] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [group, setGroup] = useState([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId);
      const fetchedPermissions = await getListData("group/" + groupId + "/permissions/" + projectId);
      const fetchedGroup = await getData("group", groupId);
      setUser(fetchedUser);
      setPermissions(fetchedPermissions);
      setGroup(fetchedGroup);
    };
    getLists();
  }, [userId, groupId, projectId]);
  
  const findPermission = (selectedValue) => {
    setSelectedPermission(selectedValue);
    updatePermission(selectedValue);
  };

  // async function updatePermission(selectedValue) {
  //   try {
  //     const selectedPermission = permissions.find(permission => permission.name === selectedValue);
  //     if (!selectedPermission) {
  //       throw new Error('Permissão selecionada não encontrada.');
  //     }
  //     console.log(selectedPermission.id)

  //     const updatedUser = { ...user, permission: selectedPermission.name, permissionId: selectedPermission.id };
  //     await putData("user/" + userId + "/" + projectId  + "/" + selectedPermission.id);

  //     alert('Permissão atualizada com sucesso!');
  //     setSelectedPermission("");
  //   } catch (error) {
  //     console.log(selectedPermission)
  //     console.error('Erro ao atualizar permissão:', error.message);
  //     alert('Não foi possível atualizar a permissão do usuário.');
  //   }
  // }

  async function updatePermission(selectedValue) {
    try {
        const selectedPermission = permissions.find(permission => permission.name === selectedValue);
        if (!selectedPermission) {
            throw new Error('Permissão selecionada não encontrada.');
        }

        console.log('ID da permissão selecionada:', selectedPermission.id);

        const updatedUser = { ...user, permission: selectedPermission.name, permissionId: selectedPermission.id };
        await putData("user", updatedUser);

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
      <div className="">
        <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-[#F76858] h-12 flex items-center justify-between">
          <div className="flex gap-6">
            {userIcon}
            <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black">{user.name}</p>
          </div>
          <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-between">
            <p>|</p>
            {group.owner && user.id === group.owner.id ? (
              ownerIcon
            ) : (
              <select
                // border-[#F04A94] dark:border-[#F76858] caso eu queira colocar borda no selec
                className='selectGroup w-[75%] mnAlata border-none dark:text-[#F76858]'
                name="permission"
                id="permission"
                value={selectedPermission}
                onChange={(e) => findPermission(e.target.value)}>
                <option value="" disabled>Permissão</option>
                {permissions.map(permission => (
                  <option key={permission.id} value={permission.name} selected={user.permission === permission.name}>
                    {permission.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



