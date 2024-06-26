import { Property } from "@/models";
import { Button } from "../Button";
import { propertyService } from "@/services";
import { CenterModal } from "../Modal/CenterModal";
import { useTranslation } from "react-i18next";
import { useState } from "react";
type ModalDelete = {
  property: Property;
  close: (boolean: boolean) => void;
  isClosed: boolean;
  closeProperty: () => void;
  deleteProperty: (property: Property) => void;
};
export const ModalDeleteProperty = ({
  property,
  close,
  isClosed,
  closeProperty,
  deleteProperty,
}: ModalDelete) => {
  const { t } = useTranslation();
  const [error, setError] = useState<boolean>(false);
  return (
    <>
      <CenterModal condition={isClosed} setCondition={close}>
        <div className="p-10 flex flex-col gap-8">
          <div className="h-[60%]  flex flex-col gap-4 ">
            <p className="h4 text-primary ">
              {error ? t("error-delete-property"):t("delete-property")}
            </p>
            <p>
             {error? t("error-alert-property") : t("alert-property")}{" "}
            </p>
          </div>

          <div className="h-min flex justify-between">
             <Button
              padding="px-5 sm:px-12"
              secondary
              text={error ? "OK": t("delete-account-cancel")}
              fnButton={() => close(false)}
            ></Button>
            {!error && <Button
              padding="px-5 sm:px-12"
              fnButton={async () => {
                closeProperty();
                deleteProperty(property)
                close(false);
              }}
            ></Button>}
          </div>
        </div>
      </CenterModal>
      {/* <div className="h-screen w-screen  fixed  z-10 top-0 right-0  bottom-0 items-center justify-center flex backdrop-blur-sm">
        
      </div> */}
    </>
  );
};
