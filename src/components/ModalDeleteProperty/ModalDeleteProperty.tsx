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
        <div className=" h-[40%] bg-white flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20 w-full  smm:w-[90%] smm:h-1/2  sm:w-1/2 sm:h-[40%] md:w-3/6 xl:w-1/3  ">
          <div className="h-[60%] w-[90%] flex flex-col gap-4 ">
            <p className="h4 text-primary ">
              Tem certeza que deseja deletar está propriedade?
            </p>
            <p>Observação: Ao deletar a propriedade, todos os projetos ou tarefas associadas serão afetados.
              Por favor, esteja ciente de que esta ação é irreversível e pode resultar na perda de dados importantes. </p>
          </div>

          <div className="h-min w-[90%] flex justify-between">
            <Button padding="px-5 sm:px-12" secondary text="Cancelar" fnButton={() => close()}></Button>
            <Button padding="px-5 sm:px-12"
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
