import { Date, Limited, Property, TypeOfProperty } from "@/models";
import { Input } from "../Input";
import { register } from "module";
import { InputCheckbox } from "../Properties/InputCheckbox";
import { Select } from "../Select";
import { OptionsInput } from "../OptionsInput";
import { useHasPermission } from "@/hooks/useHasPermission";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type ContentModalPropertyProps = {
  property?: Property;
  type: TypeOfProperty;
  register: any;

};

export const ContentModalProperty = ({
  register,
  type,
  property,
}: ContentModalPropertyProps) => {
  const permissionUpdate = useHasPermission("update");
  const [content, setContent] = useState<JSX.Element>(<></>);
  const {t} = useTranslation()
  
  const fnReturnCheckbox = () => {
    if (
      [
        TypeOfProperty.TIME,
        TypeOfProperty.USER,
        TypeOfProperty.ARCHIVE,
        TypeOfProperty.NUMBER,
        TypeOfProperty.PROGRESS,
        TypeOfProperty.TEXT,
      ].includes(type)
    ) {

      return (
        <Input
        disabled={!permissionUpdate}
          register={{ ...register("maximum") }}
          type="number"
          className="w-full justify-between "
          classNameInput={
            "w-[50%] bg-input-grey-opacity border-primary border-2 rounded-sm text-center disabled:opacity-100"
          }
          label={t("max")} // value={property ? (property as Limited).maximum : 0}
        />
      );
    } else if (
      [
        TypeOfProperty.CHECKBOX,
        TypeOfProperty.TAG,
        TypeOfProperty.RADIO,
        TypeOfProperty.SELECT,
      ].includes(type)
    ) {
  
      return <OptionsInput disabled={!permissionUpdate} property={property} label={t("options")}  />;
    } else {
      return (
        <>
          <InputCheckbox
            disabled={!permissionUpdate}
            register={{ ...register("pastDate") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2 truncate"
            title={t("can-be-pass")} 
            label={t("can-be-pass")} 
           
          />
          <InputCheckbox
            disabled={!permissionUpdate}
            register={{ ...register("schedule") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label={t("scheduling")} 
            checked={property ? (property as Date).scheduling : false}
          />
          <InputCheckbox
            disabled={!permissionUpdate}
            register={{ ...register("hours") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label={t("include-hours")} 
          />
          <InputCheckbox
            disabled={!permissionUpdate}
            register={{ ...register("deadline") }}
            className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
            label={t("deadline")} 
          />
        </>
      );
    }
  };

  useEffect(() => {
    const cotentTemp = fnReturnCheckbox();
    setContent(cotentTemp);
  }, [type, property, permissionUpdate  ]);

  return (
    <div className="h-full w-full justify-between px-6  items-center ">
      <div className="w-full h-full flex flex-col ">  
        
        <p className="h-[35%] flex items-center">{t("adjusts")}</p>
        <InputCheckbox disabled={!permissionUpdate}
          register={{ ...register("visible") }}
          className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
          label={t("visible")} 
        ></InputCheckbox>
        <InputCheckbox disabled={!permissionUpdate}
          register={{ ...register("obligatory") }}
          className="w-[30%] h-1/3 flex justify-center items-center border-primary outline-none border-2"
          label={t("obligatory")} 
        ></InputCheckbox>
      </div>
      <div className="w-full h-full flex flex-col justify-center">
        {content}
      </div>
    </div>
  );
};
