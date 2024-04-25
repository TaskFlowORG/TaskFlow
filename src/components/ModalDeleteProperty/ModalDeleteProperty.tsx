import { Property } from "@/models";
import { Button } from "../Button";
import { propertyService } from "@/services";
import { CenterModal } from "../Modal/CenterModal";
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
  return (
    <>
      <CenterModal condition={isClosed} setCondition={close}>
        <div className="p-10 flex flex-col gap-8">
          <div className="h-[60%]  flex flex-col gap-4 ">
            <p className="h4 text-primary ">
              Tem certeza que deseja deletar está propriedade?
            </p>
            <p>
              Observação: Ao deletar a propriedade, todos os projetos ou tarefas
              associadas serão afetados. Por favor, esteja ciente de que esta
              ação é irreversível e pode resultar na perda de dados importantes.{" "}
            </p>
          </div>

          <div className="h-min  flex justify-between">
            <Button
              padding="px-5 sm:px-12"
              secondary
              text="Cancelar"
              fnButton={() => close(false)}
            ></Button>
            <Button
              padding="px-5 sm:px-12"
              fnButton={async () => {
                closeProperty();
                deleteProperty(property);
                close(false);
              }}
            ></Button>
          </div>
        </div>
      </CenterModal>
      {/* <div className="h-screen w-screen  fixed  z-10 top-0 right-0  bottom-0 items-center justify-center flex backdrop-blur-sm">
        
      </div> */}
    </>
  );
};
