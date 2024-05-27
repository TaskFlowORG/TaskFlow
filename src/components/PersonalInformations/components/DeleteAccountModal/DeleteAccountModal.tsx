import { Button } from "@/components/Button";
import { useTranslation } from "react-i18next";

type ModalDelete = {
  close: () => void;
  deleteUser: () => void;
};

export const DeleteAccountModal = ({ close, deleteUser }: ModalDelete) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full h-min py-10 flex flex-col gap-10 justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
        <div className="h-[70%] w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-h3 font-alata text-primary dark:text-secondary ">
            {t("delete-account")}
          </h1>
          <div>
            <p className="text-p font-montserrat text-center">
              {t("delete-account-desc")}
            </p>
          </div>
          <div className="text-dark mt-6 dark:text-white flex flex-col gap-5 w-[80%]">
            <div>
              <p className="text-p font-montserrat px-20 text-center">
                {t("delete-account-desc-recovery")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-around w-full">
          <Button
            secondary
            text={t("delete-account-cancel")}
            fnButton={() => close()}
          ></Button>
          <Button
            fnButton={async () => {
              deleteUser();
              close();
            }}
          ></Button>
        </div>
      </div>
    </>
  );
};
