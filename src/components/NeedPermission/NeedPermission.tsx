import { useHasPermission } from "@/hooks/useHasPermission";

export const NeedPermission = ({
  permission,
  children,
}: {
  permission: "read" | "create" | "delete" | "update";
    children: React.ReactNode;
}) => {
  const hasPermission = useHasPermission(permission);
  if (!hasPermission) {
    return null;
  }else{
    return children;
  }
};
