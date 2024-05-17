import Image from "next/image";
import {
  ChangeEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { userService } from "@/services";
import { User } from "@/models";
import { InputFieldConfig } from "./components/InputFieldConfig";
import { DeleteAccountModal } from "./components/DeleteAccountModal";
import { archiveToSrc } from "@/functions";
import { CenterModal } from "../Modal";
import { UserContext } from "@/contexts/UserContext";
import { SaveChangesButton } from "./components/SaveChangesButton/SaveChangesButton";
import { useTranslation } from "react-i18next";
import { ImagemEnviada } from "../icons";
import { IconTrashBin } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorModal } from "../ErrorModal";
import { cookies } from "next/headers";
import { authentication } from "@/services/services/Authentication";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";


export const PersonalInformations = () => {
  const steps = [1000, 5000, 10000, 15000, 30000, 50000, 100000, 200000, 500000, 1000000]
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : "");
  const [surname, setSurname] = useState(user ? user.surname : "");
  const [address, setAddress] = useState(user ? user.address : "");
  const [mail, setMail] = useState(user ? user.mail : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [desc, setDesc] = useState(user ? user.description : "");
  const [points, setPoints] = useState(user ? user.points : 0);
  const [percentage, setPercentage] = useState<number>(0);
  const [nextStep, setNextStep] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState<string>(
    user ? archiveToSrc(user.picture) : ""
  );
  const [extenderBotaoDel, setExtenderBotaoDel] = useState(false);
  const [deletarModal, setDeletarModal] = useState(false);
  const [photo, setPhoto] = useState<File>();
  const fotoAindaNaoAtualizada = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setSurname(user.surname);
    setAddress(user.address);
    setMail(user.mail);
    setPhone(user.phone);
    setDesc(user.description);
    setPhotoUrl(archiveToSrc(user.picture));
    setPoints(user.points);
    const next = steps.find((step) => step > user.points) || 0;
    setNextStep(next);
    setPercentage((user.points / next) * 100);


  }, [user]);
  const asynThrow = useAsyncThrow();

  useEffect(() => {
    setPhotoUrl(archiveToSrc(user?.picture));
  }, [user]);

  const saveChanges = async () => {
    if (!user || !setUser) return;
    let updateUser = new User(
      user.id,
      user.username,
      name,
      surname,
      address,
      user.picture,
      mail,
      phone,
      desc,
      user.points,
      user.authenticate,
      user.configuration,
      user.permissions,
      user.notifications,
    );
    const updatedUser = await userService.patch(updateUser).catch(asynThrow);
    if (updatedUser)
    setUser(updatedUser);
  };

  const previewDaFoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    userService.upDatePicture(e.target.files[0]);
  };

  const [error, setError] = useState<boolean>(false);

  const deleteUser = async () => {
    if (!user || !setUser) return;
    try {
      await userService.delete(user.username);
      authentication.logout();
    } catch (error) {
      setError(true);
    }
  };

  

  return (
    <div className=" overflow-y-auto z-10 flex w-full h-full personal items-center">
      <div className="flex flex-col relative z-20 mt-40 justify-start items-center gap-10 w-full h-min py-20 lg:py-0">
        <div className="flex gap-10 lg:w-[60%] w-full px-6 lg:px-0">
          <div className="h-min relative">
            <div className="w-min h-min rounded-full overflow-clip relative p-1 bg-gradient-to-t from-primary to-secondary  dark:from-secondary dark:to-primary">

            <span className="bg-input-grey dark:bg-modal-grey absolute top-0 left-0 w-full" style={{height:100-percentage+"%"}} />
            <div
              id="fotoDeUsuario"
              className="relative  rounded-full bg-slate-500 lg:w-48 lg:h-48 w-28 h-28"
            >
              <Image
                fill
                className="rounded-full w-full h-full"
                src={photoUrl}
                alt="foto"
              />
            </div>
            </div>
              <label className="border-primary dark:border-secondary border-[1.5px] rounded-full p-2 bg-white dark:bg-back-grey  lg:w-12 lg:h-12 w-8 h-8 absolute -right-0 bottom-3 cursor-pointer">
                <div className="flex items-center justify-center w-full h-full">
                <ImagemEnviada></ImagemEnviada>
                </div>
                <input
                  ref={fotoAindaNaoAtualizada}
                  id="photo"
                  className="opacity-0 w-full h-full  absolute z-0 top-0 left-0"
                  type="file"
                  accept="image/*"
                  onChange={previewDaFoto}
                />
              </label>
              <span className="text-p font-alata w-full absolute text-center text-primary dark:text-secondary -bottom-5">{points}/{nextStep}</span>
          </div>
          <div className="flex flex-col w-full h-full justify-center item gap-4 text-modal-grey ">
            <div className="overflow-auto lg:text-[48px] text-[24px] font-alata">
              <h2 className=" text-modal-grey dark:text-white">
                {name} {surname}
              </h2>
            </div>
            <div className="flex w-80">
              <InputFieldConfig
                type="text"
                id="address"
                label={t("personal-informations-address")}
                value={address}
                placeholder={address}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setAddress(e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full h-full">
          <div className="lg:w-[60%] w-full h-full lg:grid lg:grid-cols-2 lg:grid-rows-4 flex flex-col justify-between text-modal-grey p">
            <InputFieldConfig
              type={"text"}
              id={"name"}
              label={t("personal-informations-name")}
              value={name}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setName(e.target.value)
              }
              placeholder={user?.name || ""}
            ></InputFieldConfig>
            <InputFieldConfig
              type={"text"}
              id={"surname"}
              label={t("personal-informations-surname")}
              value={surname}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setSurname(e.target.value)
              }
              placeholder={user?.surname || ""}
            ></InputFieldConfig>
            <InputFieldConfig
              type={"mail"}
              id={"mail"}
              label={t("personal-informations-email")}
              value={mail}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setMail(e.target.value)
              }
              placeholder={user?.mail || ""}
            ></InputFieldConfig>
            <InputFieldConfig
              type={"tel"}
              id={"phone"}
              label={t("personal-informations-phone")}
              value={phone}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPhone(e.target.value)
              }
              placeholder={user?.phone || ""}
            ></InputFieldConfig>
            <label className="px-6 flex flex-col lg:w-[200%] w-full text-modal-grey dark:text-white">
              {t("personal-informations-desc")}
              <textarea
                className={`dark:text-white resize-none  shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full h-[10vh]  pl-4 py-3 focus:outline-none`}
                id="desc"
                value={desc}
                spellCheck={true}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setDesc(e.target.value)
                }
                placeholder={user?.description || ""}
              />
            </label>
            <SaveChangesButton onClick={saveChanges}></SaveChangesButton>
          </div>
        </div>
        <div/>
        <div
          className="absolute lg:fixed lg:bottom-5 dark:stroke-secondary stroke-primary hover:stroke-contrast bottom-[8.5rem] right-0  flex-row-reverse px-6 flex items-center w-min"
        >
          <div
            onClick={() => setDeletarModal(true)}
            onMouseEnter={() => {
              setExtenderBotaoDel(true);
            }}
            onMouseLeave={() => {
              setExtenderBotaoDel(false);
            }}
            className={`cursor-pointer gap-2 flex items-center justify-around h4 w-min drop-shadow-xl h-12 rounded-md text-contrast px-4 hover:lg:bg-primary hover:lg:dark:bg-secondary`}
          >
            <span className="w-6  h-6 ">
              <IconTrashBin />
            </span>
            <AnimatePresence mode="wait">
            {extenderBotaoDel ? (
              <motion.p initial={{width: 0}} animate={{width: "max-content"}} exit={{width: 0}} transition={{duration: 0.2}}
              className="font-montserrat text-p w-max whitespace-nowrap lg:block hidden">
                {t("delete-account")}
              </motion.p>
            ) : null}
            </AnimatePresence>
          </div>
          <CenterModal condition={deletarModal} setCondition={setDeletarModal}>
            <DeleteAccountModal
              close={() => setDeletarModal(false)}
              deleteUser={deleteUser}
            />
          </CenterModal>
          <ErrorModal title={t("change-owners")} setCondition={setError} message={t("you-are-owner")} condition={error}  fnOk={() => setError(false)}/>
        </div>
      </div>
    </div>
  );
};
