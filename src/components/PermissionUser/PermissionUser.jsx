"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { Theme } from "react-select";


import { useEffect, useState } from "react";
import { useTheme } from "styled-components";


export const PermissionUser = ({ groupId, userId, projectId }) => {
  const [user, setUser] = useState({});
  const [selectedPermission, setSelectedPermission] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [group, setGroup] = useState([]);
  const {Theme} = useTheme;


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

  async function updatePermission(selectedValue) {
    console.log(permissions);
    console.log("escolha feita", selectedValue);
    let changed = false;
    console.log(selectedValue);
    permissions.forEach((permission) => {
      if (permission.name === selectedValue) {
        putData("user/" + userId + "/" + projectId + "/" + permission.id);
        changed = true;
      }
    });
    if (changed) {
      alert('Permissões atualizadas com sucesso');
    } else {
      alert('Não foi possível atribuir permissão a este usuário!');
    }
    setSelectedPermission("");
  }


  return (
    <div>
      <div className="">
        <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-[#F76858] h-12 flex items-center justify-between">
          <div className="flex gap-6">
            <img className="" src="/img/whiteIconUser.svg" alt="User" />
            <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black">{user.name}</p>
          </div>
          <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-between">
            <p>|</p>
            {group.owner && user.id === group.owner.id ? (
              <img className="mx-auto " src="/img/owner.svg" alt="Master" />
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



