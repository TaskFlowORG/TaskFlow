"use client";
import { getListData, getData, putData } from "@/services/http/api";
import { useEffect, useState } from "react";

export const PermissionUser = ({ groupId, userId, projectId }) => {
  const [user, setUser] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId);
      const fetchedPermissions = await getListData("group/" + groupId + "/" + projectId);
      setUser(fetchedUser);
      setPermissions(fetchedPermissions);
    };

    getLists();
  }, []);

  const handlePermissionChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedPermissions(selectedOptions);
  };

  async function updatePermission() {
    alert('Permissões atualizadas com sucesso');
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
                        className='selectGroup mnAlata border-[#F04A94] dark:border-[#F76858] dark:text-[#F76858]'
                        name="permission"
                        id="permission"
                        onChange={handlePermissionChange}
                        value={selectedPermissions}
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

