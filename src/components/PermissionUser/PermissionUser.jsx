"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { useTheme } from "next-themes";
import { use, useEffect, useState } from "react"
import { GroupOptions } from "../GroupOptions/GroupOptions"

export const PermissionUser = ({ group, userId, project }) => {
  const [user, setUser] = useState({})
  const [selectedPermission, setSelectedPermission] = useState("");
  const {theme, setTheme } = useTheme();
  const [permissionsList, setPermissionsList] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId)
      const fetchedPermissions = await getListData("permission");
      setUser(fetchedUser)
      setPermissionsList(fetchedPermissions);
    };
    getLists();
  }, [group, project]);


  async function updatePermission(selectedValue) {
    try {
      const selectedPermission = permissionsList.find(permission => permission.name === selectedValue);
      if (!selectedPermission) {
        throw new Error('Permissão selecionada não encontrada.');
      }

      const hasPermission = user.permissions.some(permission => permission.id === selectedPermission.id);

      if (hasPermission) {
        alert('Este usuário já possui esta permissão.');
      } else {
        user.permissions = [];

        user.permissions = [...user.permissions, selectedPermission];

        await putData("user", user);

        alert('Permissão atualizada com sucesso!');
      }
      setSelectedPermission("");
    } catch (error) {
      console.error('Erro ao atualizar permissão:', error.message);
      alert('Não foi possível atualizar a permissão do usuário.');
    }
  }

  const userIcon = theme === "dark" ? <img src="/img/whiteIconUser.svg" alt="User" /> : <img src="/img/darkIconUser.svg" alt="User" />;
  const ownerIcon = theme === "dark" ? <img src="/img/darkOwner.svg" alt="Owner" /> : <img src="/img/whiteOwner.svg" alt="Owner" />
  const options = theme === "dark" ? <img src="/img/optionsGroupD.svg" /> : <img src="/img/optionsGroupL.svg" />

  const fullName = `${user.name} ${user.surname}`;

  const displayFullName = fullName.length > 9 ? `${fullName.slice(0, 9)}...` : fullName;

  return (
    <div className="">
      <div className="border rounded-md relative border-primary px-4 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-secondary h-10 md:h-12 lg:h-12 flex items-center justify-between">

        <button className="flex justify-end" onClick={() => openModal ? setOpenModal(false) : setOpenModal(true)}>
          {options}
        </button>

        <div className="flex gap-6 w-full ml-2">
          {userIcon}
          <p className="whitespace-nowrap overflow-hidden dark:text-[#FCFCFC] text-black">{displayFullName}</p>
        </div>

        <div className="text-primary dark:text-secondary w-36 flex justify-between ">
          <p className={user.username === group.owner.username ? 'hidden lg:flex md:flex justify-end' : 'hidden lg:flex md:flex'}>|</p>

          {group.owner && user.username === group.owner.username ? (
            <div className="flex items-center justify-center w-full">
              {ownerIcon}
            </div>

          ) : (
            <select
              className='text-primary text-center flex flex-1 w-full mnAlata border-none dark:text-secondary'
              name="permission"
              id="permission"
              value={selectedPermission}
              onChange={(e) => updatePermission(e.target.value)}
            >
              {user.permissions && user.permissions.length > 0 ? (
                user.permissions.map((permission) => (
                  <option key={permission.id} value="" disabled>{permission.name}</option>
                ))
              ) : (
                <option value="" disabled>Permissão</option>
              )}
              {permissionsList.map(permission => {
                console.log("user", permission.project.id)
                console.log("user p", project.id)
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
      <div>
      </div>
      {/* <LocalModal condition={openModal} setCondition={setOpenModal} bottom className="top-10">
      <GroupOptions isOpen={openModal} group={group} user={user} />
      </LocalModal> */}
      <GroupOptions isOpen={openModal} group={group} user={user} />
    </div>
  );
};
