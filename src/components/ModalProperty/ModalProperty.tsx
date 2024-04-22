import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { ModalDeleteProperty } from "../ModalDeleteProperty";
import { InputCheckbox } from "../Properties/InputCheckbox";
import { SideBarButton } from "../SideBarProjects/components/SideBarButton";
import {
  Date,
  Limited,
  Property,
  PropertyPost,
  Select,
  TypeOfProperty,
} from "@/models";
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
  IconUser,
  IconClock,
} from "../icons";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { useForm } from "react-hook-form";
import { ContentModalProperty } from "../ContentModalProperty";
import { set } from "zod";

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
      visible: property.visible,
      obligatory: property.obligatory,
      maximum: (property as Limited).maximum,
      pastDate: (property as Date).canBePass,
      schedule: (property as Date).scheduling,
      hours: (property as Date).includesHours,
      deadline: (property as Date).deadline,
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
      case "USER":
        return <IconUser/>;
      case "TIME":
        return <IconClock/>
      default:
        break;
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
        <div className="w-full h-[90%] flex flex-col justify-center items-center dark:bg-modal-grey">
          <ContentModalProperty register={register} property={property} type={property.type}></ContentModalProperty>
          <div className="h-min pb-2 w-[95%] flex justify-between">
            <button
              className="w-5 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary"
              onClick={() => {
                setModalDelete(true);
              }}
            >
              {" "}
              <IconTrashBin />
            </button>
            <button
              className="w-5 h-5/6 flex justify-center items-center rounded-sm"
              onClick={() => {
                try{
                  upDateProperties(property, getValues());
                  setOpenOptions(false);
                  }catch(e){
                    console.log(e)
                }
              }}
            >
              <IconSave />
            </button>
            
            
          </div>
        </div>
      </SideBarButton>
      {ModalDelete && (
        <ModalDeleteProperty
          property={property}
          deleteProperty={deleteProperty}
          close={()=>setModalDelete(false)}
          closeProperty={()=>setOpenOptions(false)}
        />
      )}
    </div>
  );
};
