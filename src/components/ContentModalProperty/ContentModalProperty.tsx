import { Date, Limited, Property, TypeOfProperty } from "@/models";
import { Input } from "../Input";
import { register } from "module";
import { InputCheckbox } from "../Properties/InputCheckbox";

type ContentModalPropertyProps = {
  property?: Property;
  type: TypeOfProperty;
  register: any;
};

export const ContentModalProperty = ({
  register,
  type,
  property
}: ContentModalPropertyProps) => {
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

        console.log(property ,"dentro")
      return (
        <Input
          register={{ ...register("maximum") }}
          type="number"
          classNameInput={""}
          // value={property ? (property as Limited).maximum : 0}
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
  );
};
