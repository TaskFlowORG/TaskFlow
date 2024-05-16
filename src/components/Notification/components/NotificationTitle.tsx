import { TypeOfNotification } from "@/models/enums/TypeOfNotification";
import { useTranslation } from "react-i18next";

export const NotificationTitle = ({ type }: { type: TypeOfNotification }) => {
    const {t} = useTranslation();
  switch (type) {
    case TypeOfNotification.CHANGETASK:
      return <h5>{t("task")}</h5>;
    case TypeOfNotification.ADDINGROUP:
      return <h5>{t("invite-group")}</h5>;
    case TypeOfNotification.REMOVEINGROUP:
      return <h5>{t("group")}</h5>;
    case TypeOfNotification.CHANGEPERMISSION:
      return <h5>{t("permission")}</h5>;
    case TypeOfNotification.POINTS:
      return <h5>{t("congrats")}</h5>;
    case TypeOfNotification.SCHEDULE:
      return <h5>{t("schedule")}</h5>;
    case TypeOfNotification.DEADLINE:
      return <h5>{t("deadline")}</h5>;
    case TypeOfNotification.CHAT:
      return <h5>{t("chat")}</h5>;
    case TypeOfNotification.COMMENTS:
      return <h5>{t("comment")}</h5>;
    case TypeOfNotification.INVITETOPROJECT:
        return <h5>{t("invite")}</h5>;
  }
};
