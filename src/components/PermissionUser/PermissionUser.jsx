import Select from "react-select";
import { getListData, getData, putData } from "@/services/http/api";
import { useEffect, useState } from "react";

export const PermissionUser = ({ groupId, userId, projectId }) => {
  const [user, setUser] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const getLists = async () => {
      const fetchedUser = await getData("user", userId);
      const fetchedPermissions = await getListData("group/" + groupId + "/permissions/" + projectId);
      setUser(fetchedUser);
      setPermissions(fetchedPermissions);
    };

    getLists();
  }, []);

  const handlePermissionChange = (selectedOptions) => {
    setSelectedPermissions(selectedOptions);
    user.permission = selectedOptions.permission
    updatePermission()
    console.log(selectedOptions)

  };

  async function updatePermission() {
    //Não é a requisição certa, pero que si pero que no, devo arrumar amanhâ
   await putData("group/user/" + groupId, user);
   console.log("tô")
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
            <Select
              className=' mnAlata border-[#F04A94] dark:border-[#F76858] dark:text-[#F76858]'
              name="permission"
              id="permission"
              isMulti
              onChange={handlePermissionChange}
              value={selectedPermissions}
              options={permissions.map(permission => ({
                value: permission.permission,
                label: permission.name
              }))}
              menuIsOpen={isMenuOpen}
              onMenuOpen={() => setIsMenuOpen(true)}
              onMenuClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
