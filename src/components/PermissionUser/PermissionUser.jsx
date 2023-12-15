"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { useEffect, useState } from "react";

export const PermissionUser = ({ groupId, userId, projectId, permissionId = 1 }) => {
  const [user, setUser] = useState({});
  const [selectedPermission, setSelectedPermission] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId);
      const fetchedPermissions = await getListData(`group/${groupId}/permissions/${projectId}`);
      setUser(fetchedUser);
      setPermissions(fetchedPermissions);
    };

    getLists();
  }, [userId, groupId, projectId]);

  const findPermission = (selectedValue) => {
    setSelectedPermission(selectedValue);
    updatePermission();
  };

  async function updatePermission() {
    console.log("Selected Permission:", selectedPermission);

    // try {
    user.permission = selectedPermission;

    console.log("projectId:", projectId);
    console.log("groupId:", groupId);
    console.log("user.id:", user.id);
    console.log("permissionId:", permissionId);

    await putData("group/" + projectId + "/" + groupId + "/user/" + user.id + "/permission/" + permissionId, user);

    alert('Permissões atualizadas com sucesso');
    // } catch (error) {
    //   console.error("Erro ao atualizar permissões:", error);
    //   alert('Erro ao atualizar permissões.');
    // }
  }


  return (
    <div>
      <div className="">
        <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-[#F76858] h-12 flex items-center justify-between">
          <div className="flex gap-6">
            <img className="" src="/img/User.svg" alt="User" />
            <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black">{user.name}</p>
          </div>
          <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-between">
            <p>|</p>
            <select
              className='selectGroup w-[75%] mnAlata border-[#F04A94] dark:border-[#F76858] dark:text-[#F76858]'
              name="permission"
              id="permission"
              value={selectedPermission}
              onChange={(e) => findPermission(e.target.value)}
            >
              <option value="" disabled>Permissão</option>
              {permissions.map(permission => (
                <option key={permission.id} value={permission.permission}>
                  {permission.name}
                </option>
              ))}
            </select>

          </div>
        </div>
      </div>
    </div>
  );
};
