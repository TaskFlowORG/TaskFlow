import { If } from "@/components/If";
import { EditIcon, IconTrashBin } from "@/components/icons";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { IconSave } from "@/components/icons/Slidebarprojects/IconSave";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { Permission, TypePermission } from "@/models";
import { useTranslation } from "next-i18next";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { Role } from "./Role";
import { Button } from "@/components/Button";
import { permissionService } from "@/services";
import { LocalModal } from "@/components/Modal";
import { IconDefault } from "@/components/icons/IconDefault";

export const PermissionComponent = ({
  permission,
  setPermissionEditing,
  permissions,
  permissionEditing,
  setPermissions,
}: {
  permission: Permission;
  setPermissionEditing: (value: Permission | undefined) => void;
  permissionEditing?: Permission;
  permissions: Permission[];
  setPermissions: (value: Permission[]) => void;
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(permission.name);
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const [create, setCreate] = useState<boolean>(
    permission.permission.toString().includes("CREATE")
  );
  const [_delete, setDelete] = useState<boolean>(
    permission.permission.toString().includes("DELETE")
  );
  const [update, setUpdate] = useState<boolean>(
    permission.permission.toString().includes("UPDATE")
  );

  const updatePermission = (hasPermission: boolean, role: string) => {
    if (role == "create") setCreate(hasPermission);
    if (role == "delete") setDelete(hasPermission);
    if (role == "update") setUpdate(hasPermission);
  };

  useEffect(() => {
    if (editing) {
      setPermissionEditing(permission);
    } else {
      setPermissionEditing(undefined);
    }
  }, [editing]);

  function cancelUpdate() {
    setCreate(permission.permission.toString().includes("CREATE"));
    setDelete(permission.permission.toString().includes("DELETE"));
    setUpdate(permission.permission.toString().includes("UPDATE"));

    setEditing(false);
  }

  function updateFinal() {
    setEditing(false);
    if (create && _delete && update)
      permission.permission = TypePermission.UPDATE_DELETE_CREATE;
    if (create && _delete && !update)
      permission.permission = TypePermission.DELETE_CREATE;
    if (create && !_delete && update)
      permission.permission = TypePermission.UPDATE_CREATE;
    if (!create && _delete && update)
      permission.permission = TypePermission.UPDATE_DELETE;
    if (create && !_delete && !update)
      permission.permission = TypePermission.CREATE;
    if (!create && _delete && !update)
      permission.permission = TypePermission.DELETE;
    if (!create && !_delete && update)
      permission.permission = TypePermission.UPDATE;
    if (!create && !_delete && !update)
      permission.permission = TypePermission.READ;
    permission.name = name;
    console.log(name);
    permissionService.upDate(permission);
  }

  function deletePermission() {
    console.log(otherPermission);

    if (!otherPermission || !project) return;
    setPermissions(permissions.filter((p) => p.id != permission.id));
    permissionService.delete(permission.id, project?.id, otherPermission.id);
  }

  const [otherPermission, setOtherPermission] = useState<Permission>(
    permissions[0].id == permission.id ? permissions[1] : permissions[0]
  );
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    setOtherPermission(
      permissions[0].id == permission.id ? permissions[1] : permissions[0]
    );
  }, [permissions]);

  function updateToDefault(): void {
    if (permission.isDefault) return;
    permissions.find((p) => p.isDefault)!.isDefault = false;
    permission.isDefault = true;
    permissionService.upDate(permission);
    setPermissions([...permissions]);
  }

  return (
    <div
      className={
        "flex flex-col " +
        (!permissionEditing || permission.id == permissionEditing.id
          ? "flex"
          : "hidden")
      }
    >
      <span className="flex w-full justify-between  items-center gap-2">
        <input
          type="text"
          value={name == null || name == "" ? t("withoutname") : name}
          disabled={!editing}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          className="max-w-full w-full truncate text-contrast bg-transparent text-p font-montserrat"
          style={{ opacity: name || editing ? 1 : 0.5 }}
          title={name == null || name == "" ? t("withoutname") : name}
        />
        <If condition={project?.owner.id == user?.id}>
          <span className="flex items-center w-min h-min gap-2">
          <span className="w-4 h-4 flex">
                  <IconDefault
                    isDefault={permission.isDefault}
                    editing={editing}
                    className={
                      "text-contrast w-full h-full " +
                      (permission.isDefault ? "" : "cursor-pointer")
                    }
                    onClick={updateToDefault}
                  />
                </span> 
            <If condition={!editing}>
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="w-4 h-4 stroke-contrast"
                >
                  <EditIcon />
                </button>
                <div className="w-min h-min relative">
                  <button
                    className="w-4 h-4"
                    onClick={(e) => {
                      setX(e.clientX);
                      setY(e.clientY);
                      setDeleting(!deleting);
                    }}
                  >
                    <span className="stroke-contrast">
                      <IconTrashBin />
                    </span>
                  </button>
                  <LocalModal
                    condition={deleting}
                    setCondition={setDeleting}
                    classesOrigin="origin-top-right"
                    right
                  >
                    {permissions.length > 1 ? (
                      <div className="bg-input-grey flex justify-center gap-2 flex-col items-center dark:bg-modal-grey p-2 h-36 2xl:w-40 xl:w-32 sm:w-24 w-full smm:w-48  rounded-md">
                        <p className="text-modal-grey text-p14 text-center pt-2 dark:text-white">
                          {t("choice-another-permission")}
                        </p>
                        <select
                          className="w-full h-8 bg-transparent border-2 text-center border-primary dark:border-secondary"
                          onChange={(e) =>
                            setOtherPermission(
                              permissions.find((p) => p.id == +e.target.value)!
                            )
                          }
                          defaultValue={otherPermission?.id}
                        >
                          {permissions
                            .filter((p) => p.id != permission.id)
                            .map((p, index) => (
                              <option key={index} value={p.id} className="text-mn">
                                {p.name == null  ? p.name :  t("withoutname")}
                              </option>
                            ))}
                        </select>
                        <span className="flex w-full justify-between">
                          <button
                          className="bg-primary dark:bg-secondary flex p-2 w-8 h-8 rounded-md"
                          onClick={() => setDeleting(false)}
                          >
                            <IconPlus classes="text-contrast w-full h-full" />
                          </button>
                          <button
                          className="bg-primary dark:bg-secondary w-8 h-8 rounded-md p-[0.6rem]"
                          onClick={deletePermission}
                          >
                            <IconSave classes="text-contrast w-full h-full" />
                          </button>
                        </span>
                      </div>
                    ) : (
                      <div className="2xl:w-40 xl:w-32 sm:w-24 w-full smm:w-48 h-min rounded-md p-4 whitespace-nowrap  bg-input-grey">
                        <p className="text-modal-grey w-full whitespace-pre-wrap text-center text-[14]">
                          {t("cant-delete-permission")}
                        </p>
                      </div>
                    )}
                  </LocalModal>
                </div>
              </>
            </If>
          </span>
        </If>
      </span>
      <div>
        <Role
          updatePermission={updatePermission}
          role="create"
          editing={editing}
          selected={create}
        />
        <Role
          updatePermission={updatePermission}
          role="delete"
          editing={editing}
          selected={_delete}
        />
        <Role
          updatePermission={updatePermission}
          role="update"
          editing={editing}
          selected={update}
        />
        <If condition={editing}>
          <div className="w-full justify-between gap-2 flex mt-2">
            <Button
              text={t("cancel")}
              width="w-full"
              textColor="text-contrast"
              border="border-2 border-contrast"
              padding="p-1"
              hover="hover:brightness-110"
              paddingY="py-px"
              textSize="text-p14"
              fnButton={cancelUpdate}
            />
            <Button
              text={t("save")}
              width="w-full"
              textColor="text-contrast"
              border="border-2 border-contrast"
              hover="hover:brightness-110"
              padding="p-1"
              paddingY="py-px"
              textSize="text-p14"
              fnButton={updateFinal}
            />
          </div>
        </If>
      </div>
    </div>
  );
};
