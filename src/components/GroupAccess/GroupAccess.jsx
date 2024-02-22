import React, { useState, useEffect } from "react";
import { getListData } from "@/services/http/api";

export const GroupAccess = ({ name, description, projectId, groupId }) => {
  // const [permissions, setPermissions] = useState([]);
  // const [selectedPermission, setSelectedPermission] = useState([]);

  // useEffect(() => {
  //     const getList = async () => {
  //         const fetchedPermissions = await getListData("group/" + groupId + "/permissions/" + projectId);
  //         setPermissions(fetchedPermissions);
  //         // // console.log(fetchedPermissions)
  //     }
  //     getList();
  // }, []);

  // //{projectId}{groupId}/{permission}

  // const findPermission = (selectedValue) => {
  //     const selectedPermissionToAdd = permissions.find(permission => permission.permission === selectedValue);
  //     setSelectedPermission(selectedPermissionToAdd);
  //     updatePermission()
  // };

  // async function updatePermission() {
  //     // // console.log(selectedPermission)
  //     user.permission = selectedPermission;
  //     await putData("group/user/" + groupId, user);
  //     alert('Permissões atualizadas com sucesso');
  // }

  return (
    <div className="flex gap-4 items-start">
      <img className="py-4" src="/img/EllipseTest.svg" />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="pAlata text-[#333] dark:text-[#FCFCFC] ">{name}</h3>
          <p className="mn whitespace-pre-wrap w-[403px] text-[#333]  dark:invert">
            {description}
          </p>
        </div>
        {/* <div className="flex justify-end">
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
                </div> */}
      </div>
    </div>
  );
};
