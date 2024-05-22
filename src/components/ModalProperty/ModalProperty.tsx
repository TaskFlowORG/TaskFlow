import { useState, useRef, useEffect } from "react";
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
  IconTag,
} from "../icons";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { useForm } from "react-hook-form";
import { ContentModalProperty } from "../ContentModalProperty";
import { NeedPermission } from "../NeedPermission";
import { get } from "http";
import { IconEditColoured } from "../icons/PageOtpions/IconEditCoulored";
import { propertyService } from "@/services";
import { ErrorModal } from "../ErrorModal";

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
  const [prop, setProp] = useState<Property>(property);
  const [openOptions, setOpenOptions] = useState(false);
  const ref = useRef(null);

  const setOptionsFN = () => {
    setOpenOptions(openOptions);
  };
  useEffect(() => {
    setProp(property);
    if (property.type === TypeOfProperty.DATE) {
      setValue("pastDate", (property as Date).canBePass);
      setValue("schedule", (property as Date).scheduling);
      setValue("hours", (property as Date).includesHours);
      setValue("deadline", (property as Date).deadline);
    }
  }, [property]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      visible: prop.visible,
      obligatory: prop.obligatory,
      maximum: (prop as Limited).maximum,
      pastDate: (prop as Date).canBePass,
      schedule: (prop as Date).scheduling,
      hours: (prop as Date).includesHours,
      deadline: (prop as Date).deadline,
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
        return <IconUser />;
      case "TIME":
        return <IconClock />;
      case "TAG":
        return <IconTag />;
    }
  };

  const [name, setName] = useState(property.name);
  const [editing, setEditing] = useState(false);

  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && textRef.current) {
      textRef.current.focus();
    }
  }, [editing]);

  const saveName = () => {
    setEditing(false);
    if (property.type === TypeOfProperty.DATE) {
      propertyService.patchDate(property.id, { id: property.id, name: name } as Date);
    } else if ([TypeOfProperty.ARCHIVE, TypeOfProperty.NUMBER, TypeOfProperty.PROGRESS, TypeOfProperty.TIME, TypeOfProperty.TEXT, TypeOfProperty.USER].includes(property.type)) {
      propertyService.patchLimited(property.id, { id: property.id, name: name } as Limited);
    } else {
      propertyService.patchSelect(property.id, { id: property.id, name: name } as Select);
    }
  }

  const saveNewName = (e: any) => {
    if (!e.key || e.key === "Enter") {
      saveName();
    }
    setName(textRef.current?.textContent ?? property.name);

  }


  return (
    <div
      key={property.id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full"
    >
      <SideBarButton
        isLittle
        text={property.name}
        fnRename={saveNewName}
        renaming={editing}
        icon={
          editing ?
            <span onClick={(e) => { e.stopPropagation(); saveName() }}>
              <IconSave />
            </span>
            :
            isHovering ? (
              <span onClick={(e) => { e.stopPropagation(); setEditing(!editing) }}>
                <IconEditColoured />
              </span>
            ) : (
              fnReturnImageProperty(property.type)
            )
        }
        openOptions={openOptions}
        fnClick={() => {
          setOpenOptions(editing ? false : !openOptions);
        }}
        fnOpenOptions={setOptionsFN}
        textRef={textRef}
        openOptionsRef={ref}
        isHovering={isHovering && !editing}
        hasButton
      >
        <div className="w-full h-min flex flex-col justify-center items-center dark:bg-modal-grey">
          <ContentModalProperty
            register={register}
            property={property}
            type={property.type}
          ></ContentModalProperty>
          <div className="h-min pb-2 w-[95%] flex justify-between">
            <NeedPermission permission="delete">
              <button
                className="w-5 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary"
                onClick={() => {
                  setModalDelete(true);
  
                }}
              >
                {" "}
                <IconTrashBin />
              </button>
            </NeedPermission>
            <NeedPermission permission="update">
              <button
                className="w-5 h-5/6 flex justify-center items-center rounded-sm"
                onClick={() => {
                  upDateProperties(property, getValues());
                  setOpenOptions(false);

                }}
              >
                <IconSave />
              </button>
            </NeedPermission>
          </div>
        </div>
      </SideBarButton>
      {ModalDelete && (
        <ModalDeleteProperty
          isClosed={ModalDelete}
          property={property}
          deleteProperty={deleteProperty}
          close={() => setModalDelete(false)}
          closeProperty={() => setOpenOptions(false)}
        />
      )}
    </div>
  );
};
