import { Property } from "@/models";
import { Button } from "../Button";
import { propertyService } from "@/services";
type ModalDelete = {
  property: Property;
  close: () => void;
  closeProperty: () => void;
  deleteProperty: (property: Property) => void;
};
export const ModalDeleteProperty = ({
  property,
  close,
  closeProperty,
  deleteProperty,
}: ModalDelete) => {
  return (
    <>
      <div className="h-screen w-screen  fixed  z-10 top-0 right-0  bottom-0 items-center justify-center flex backdrop-blur-sm">
        <div className="w-[30%] h-[40%] bg-white flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20 smm:w-[60%] sm:w-1/2 md:w-1/2 xl:w-1/3">
          <div className="h-[60%] w-[90%] flex flex-col ">
            <p className="h3 text-primary">
              Tem certeza que deseja deletar está propriedade?
            </p>
            <p>Observação: Ao deletar a propriedade </p>
          </div>

          <div className="h-min w-[90%] flex justify-between">
            <Button secondary text="Cancelar" fnButton={() => close()}></Button>
            <Button
              fnButton={async () => {
                closeProperty();
                deleteProperty(property);
                close();
              }}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};
