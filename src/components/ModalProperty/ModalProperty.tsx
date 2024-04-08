import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { ModalDeleteProperty } from "../ModalDeleteProperty";
import { InputCheckbox } from "../Properties/InputCheckbox";
import { SideBarButton } from "../SideBarProjects/components/SideBarButton";
import { Date, Limited, Property, PropertyPost, Select, TypeOfProperty } from "@/models";
import {
  IconText,
  IconArchive,
  IconCalendar,
  IconNumber,
  IconProgress,
  IconRadio,
  IconSelect,
  IconCheckbox,
  IconTrashBin,
} from "../icons";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { useForm } from "react-hook-form";
import { propertyService } from "@/services";
import { DateGet } from "@/models/property/date/DateGetDTO";
import { Input } from "../Input";

type ModalPropertyProps = {
  property: Property;
  deleteProperty: (property: Property) => void;
  upDateProperties: (property: Property, getValues: any) => void;
};

export const ModalProperty = ({
  property,
  deleteProperty,
  upDateProperties,
}: ModalPropertyProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [ModalDelete, setModalDelete] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const ref = useRef(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      visible: true,
      obligatory: false,
      maximum: 0,
      pastDate: false,
      schedule: false,
      hours: false,
      deadline: false,
    },
  });

  useClickAway(ref, () => setOpenOptions(false));
  const fnReturnImageProperty = (type: string) => {
    switch (type) {
      case "TEXT":
        return <IconText />;
      case "ARCHIVE":
        return <IconArchive />;
      case "DATE":
        return <IconCalendar />;
      case "NUMBER":
        return <IconNumber />;
      case "PROGRESS":
        return <IconProgress />;
      case "RADIO":
        return <IconRadio />;
      case "SELECT":
        return <IconSelect />;
      case "CHECKBOX":
        return <IconCheckbox />;
      default:
        break;
    }
  };

  const fnReturnCheckbox = () => {
    if (
      [TypeOfProperty.TIME,TypeOfProperty.USER,TypeOfProperty.ARCHIVE,TypeOfProperty.NUMBER,TypeOfProperty.PROGRESS,TypeOfProperty.TEXT,].includes(property.type)
    ) {
      return (
    <Input register={{...register("maximum")}} type="number" classNameInput={""} />
      );
    } else if (
      [TypeOfProperty.CHECKBOX,TypeOfProperty.TAG,TypeOfProperty.RADIO,TypeOfProperty.SELECT,].includes(property.type)
    ) {
      return <p>SELECT</p>;
    } else {
      return (
        <>
          <InputCheckbox
            register={{ ...register("pastDate") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label="Pode ser data passada"
          />
          <InputCheckbox
            register={{ ...register("schedule") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label="Incluir agendamento"
          />
          <InputCheckbox
            register={{ ...register("hours") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label="Incluir horas"
          />
          <InputCheckbox
            register={{ ...register("deadline") }}
            
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label="Prazo final"
          />
        </>
      );
    }
  };
 
  return (
    <div
      key={property.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full"
    >
      <SideBarButton
        text={property.name}
        icon={fnReturnImageProperty(property.type)}
        openOptions={openOptions}
        fnOpenOptions={() => setOpenOptions(true)}
        openOptionsRef={ref}
        isHovering={isHovering}
      >
        <div className="w-full h-full flex flex-col justify-center items-center dark:bg-modal-grey">
          <div className="h-full w-full flex justify-between px-6 flex-wrap items-center ">
            {fnReturnCheckbox()}
            <InputCheckbox
              register={{ ...register("visible") }}
              className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
              label="Visible"
            ></InputCheckbox>
            <InputCheckbox
              register={{ ...register("obligatory") }}
              className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
              label="Obligatory"
            ></InputCheckbox>
          </div>
          <div className=" h-min pb-2 w-[95%] flex justify-between">
            <button
              className="w-8 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary"
              onClick={() => {
               deleteProperty(property);
              }}
            >
              {" "}
              <IconTrashBin />
            </button>
            <button
              className="w-8 h-5/6 flex justify-center items-center rounded-sm"
              onClick={() => {
                upDateProperties(property, getValues());
              }}
            >
              <IconSave />
            </button>
            {ModalDelete && (
              <ModalDeleteProperty
                property={property}
                close={() => setModalDelete(false)}
                deleteProperty={deleteProperty}
              />
            )}
          </div>
        </div>
      </SideBarButton>
    </div>
  );
};
