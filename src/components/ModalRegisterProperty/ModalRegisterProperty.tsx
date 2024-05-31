import { Page, Project, TypeOfProperty } from "@/models";
import { Input } from "../Input";
import { SelectWithImage } from "../SelectWithImage/SelectwithImage";
import { use, useState } from "react";
import {
  IconArchive,
  IconCalendar,
  IconCheckbox,
  IconClock,
  IconNumber,
  IconProgress,
  IconRadio,
  IconSelect,
  IconTag,
  IconText,
  IconTrashBin,
  IconUser,
} from "../icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { ContentModalProperty } from "../ContentModalProperty";
import { useTranslation } from "next-i18next";
import { Info } from "../Info";
import { twMerge } from "tailwind-merge";
type ModalRegisterPropertyProps = {
  open: boolean;
  close: () => void;
  project: Project;
  page?: Page;
  postProperty: (name: string, values: any, select: TypeOfProperty) => void;
  isInModal?: boolean;
};

export const ModalRegisterProperty = ({
  open,
  close,
  page,
  project,
  isInModal = false,
  postProperty,
}: ModalRegisterPropertyProps) => {
  const [selected, setSelected] = useState<TypeOfProperty>(TypeOfProperty.TEXT);
  const [object, setObject] = useState({} as FormData);
  const { t } = useTranslation();
  type FormData = z.infer<typeof schema>;

  const schema = z.object({
    name: z
      .string().optional().default(""),
    maximum: z.number().optional().default(0),
    visible: z.boolean().optional().default(true),
    obligatory: z.boolean().optional().default(false),
    pastDate: z.boolean().optional().default(false),
    schedule: z.boolean().optional().default(false),
    hours: z.boolean().optional().default(false),
    deadline: z.boolean().optional().default(false),
    color: z.string().optional().default("#f04a94"),
  });

  const container = twMerge(
    "h-16 w-full border-b-2 gap-2 border-primary-opacity dark:border-secondary-opacity flex  items-center  justify-evenly",
    isInModal ? "border-b-0 justify-start " : " "
  );

  const input = twMerge(
    "flex justify-center items-center",
    isInModal ? "w-full flex-1 p-0" : ""
  );
  const contentInput = twMerge(
    "bg-transparent p outline-none w-[90%] h-full",
    isInModal ? "w-full" : ""
  );
  const select = twMerge("w-14", isInModal ? "ml-3" : "");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <>
      {open && (
        <div className="h-min w-full   flex flex-col justify-center items-center">
          <div className="h-min w-full flex flex-col">
            <div className={container}>
              <Info
                title={selected.toLowerCase()}
                text={selected.toLowerCase() + "-info"}
                right
              />
              <span className={select}>
                <SelectWithImage
                  list={[
                    { value: TypeOfProperty.ARCHIVE, image: <IconArchive /> },
                    { value: TypeOfProperty.TAG, image: <IconTag /> },
                    { value: TypeOfProperty.CHECKBOX, image: <IconCheckbox /> },
                    { value: TypeOfProperty.DATE, image: <IconCalendar /> },
                    { value: TypeOfProperty.NUMBER, image: <IconNumber /> },
                    { value: TypeOfProperty.PROGRESS, image: <IconProgress /> },
                    { value: TypeOfProperty.RADIO, image: <IconRadio /> },
                    { value: TypeOfProperty.SELECT, image: <IconSelect /> },
                    { value: TypeOfProperty.TEXT, image: <IconText /> },
                    { value: TypeOfProperty.USER, image: <IconUser /> },
                    { value: TypeOfProperty.TIME, image: <IconClock /> },
                  ]}
                  selected={selected}
                  onChange={function (value: string): void {
                    setSelected(value as TypeOfProperty);
                  }}
                />
              </span>
              <Input
                register={{ ...register("name") }}
                value={object.name}
                className={input}
                classNameInput={contentInput}
                placeholder={t("name-property")}
              />
              <button
                className="w-5 h-5/6 flex justify-center items-center rounded-sm stroke-primary dark:stroke-secondary"
                onClick={() => {
                  close();
                }}
              >
                <IconTrashBin />
              </button>
              <button
                className="w-5 h-5/6 flex justify-center items-center rounded-sm"
                onClick={() => {
                  postProperty(getValues().name, getValues(), selected);
                  close();  setValue("name", "");
                }}
              >
                <IconSave />
              </button>
            </div>
          </div>
          <p className=" w-full h-2/6 flex items-center text-p14 text-red-500  justify-center">
            {errors.name?.message}
          </p>
        </div>
      )}
    </>
  );
};
