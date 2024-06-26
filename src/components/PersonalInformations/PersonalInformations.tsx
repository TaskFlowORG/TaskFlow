import Image from "next/image";
import { ChangeEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { userService } from "@/services";
import { User } from "@/models";
import { InputFieldConfig } from "@/components/PersonalInformations/components/InputFieldConfig";
import { DeleteAccountModal } from "@/components/PersonalInformations/components/DeleteAccountModal";
import { archiveToSrc } from "@/functions";
import { CenterModal } from "@/components/Modal";
import { UserContext } from "@/contexts/UserContext";
import { SaveChangesButton } from "@/components/PersonalInformations/components/SaveChangesButton/SaveChangesButton"
import { useTranslation } from "react-i18next";
import { ImagemEnviada } from "@/components/icons/index";
import { IconTrashBin } from "@/components/icons/index";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorModal } from "@/components/ErrorModal/index";
import { authentication } from "@/services/services/Authentication";
import { ChangeAccountNameModal } from "./components/ChangeAccountNameModal";
import { ChangePasswordModal } from "./components/ChangePasswordModal";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { useRouter } from "next/navigation";

export const PersonalInformations = () => {
  const steps = [1000, 5000, 10000, 15000, 30000, 50000, 100000, 200000, 500000, 1000000]
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : "");
  const [surname, setSurname] = useState(user ? user.surname : "");
  const [mail, setMail] = useState(user ? user.mail : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [desc, setDesc] = useState(user ? user.description : "");
  const [points, setPoints] = useState(user ? user.points : 0);
  const [percentage, setPercentage] = useState<number>(0);
  const [nextStep, setNextStep] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState<string>(user ? archiveToSrc(user.picture) : "");
  const [extenderBotaoDel, setExtenderBotaoDel] = useState(false);
  const [deletarModal, setDeletarModal] = useState(false);
  const [photo, setPhoto] = useState<File>();
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { t } = useTranslation();
  const fotoAindaNaoAtualizada = useRef<HTMLInputElement>(null);
  const [sucess, setSucess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setSurname(user.surname);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sucess) setSucess(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [sucess]);

  const saveChanges = async () => {
    if (!user || !setUser) return;
    let updateUser = new User(
      user.id,
      user.username,
      name,
      surname,
      user.picture,
      mail,
      phone,
      desc,
      user.points,
      user.authenticate,
      user.configuration,
      user.permissions,
      user.notifications
    );

    if (verifyChange(updateUser)) {
      const updatedUser = await userService.patch(updateUser).catch(asynThrow);
      if (updatedUser)
        setUser(updatedUser);
    }
  };

  const verifyChange = (newUser: User) => {
    if (verifyChangee(newUser)) {
      if (mail.includes("@")) {
        setSucess(true);
        setMessage(t("profile-sucess"));
        return true
      } else {
        setSucess(true);
        setMessage(t("email-invalid"));
        return false
      }
    } else {
      setMessage(t("dont-change"));
      setSucess(true);
      return false
    }
  }

  const verifyChangee = (newUser: User) => {
    if (newUser.name != user?.name || newUser.surname != user?.surname || newUser.mail != user?.mail || newUser.phone != user?.phone || newUser.description != user?.description) {
      return true;
    } else {
      return false;
    }
  }
  const previewDaFoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    userService.upDatePicture(e.target.files[0]);
    setSucess(true);
    setMessage(t("profile-photo-sucess"));
  };
const route = useRouter();
  const deleteUser = async () => {
    if (!user || !setUser) return;
    try {
      await userService.delete(user.username);
      authentication.logout();
      route.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="overflow-auto z-10 flex w-full h-full  lg:pt-20 pt-14">
      <div className="flex flex-col relative z-20 justify-start items-center gap-10 w-full h-min py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 w-full lg:w-[57.5%]  px-6 lg:px-0">
          <div className="h-min relative w-32 lg:w-fit">
            <div className="w-min h-min rounded-full overflow-clip border-[1px] border-primary dark:border-secondary relative p-1 bg-gradient-to-t from-primary to-secondary  dark:from-secondary dark:to-primary">
              <span className="bg-input-grey  dark:bg-modal-grey absolute top-0 left-0 w-full" style={{ height: 100 - percentage + "%" }} />
              <div
                id="fotoDeUsuario" className="relative border-[1px] border-primary dark:border-secondary rounded-full bg-slate-500 lg:w-48 lg:h-48 w-28 h-28">
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
          <div className="flex flex-col h-full item gap-4 text-modal-grey w-full">
            <h2 className="text-h4 lg:text-h3 font-alata text-modal-grey dark:text-white text-center lg:text-start break-words">
              {user?.name} {user?.surname}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center w-full h-full">
          <div className="lg:w-[60%] w-full h-full flex flex-col justify-between text-modal-grey gap-5 lg:gap-10">
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-5 lg:gap-0">
              <InputFieldConfig
                type="text"
                id="username"
                disabled={true}
                label={t("personal-informations-username")}
                value={user?.username as string}
                placeholder={user?.username as string}
                hasImage={true}
                classes="px-6"
                onClick={() => setChangeNameModal(true)}
              />
              <InputFieldConfig
                type="text"
                id="password"
                disabled={true}
                value="********"
                label={t("personal-informations-password")}
                hasImage={true}
                classes="px-6"
                onClick={() => setChangePasswordModal(true)}
              />
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:grid-rows-3 flex flex-col gap-5 lg:gap-0">
              <InputFieldConfig
                type={"text"}
                id={"name"}
                disabled={false}
                label={t("personal-informations-name")}
                maxCharacters={23}
                value={name}
                classes="px-6"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setName(e.target.value)
                }
                hasImage={false}
                placeholder={user?.name || ""}
              />
              <InputFieldConfig
                type={"text"}
                id={"surname"}
                disabled={false}
                maxCharacters={23}
                label={t("personal-informations-surname")}
                value={surname}
                classes="px-6"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSurname(e.target.value)
                }
                hasImage={false}
                placeholder={user?.surname || ""}
              />
              <InputFieldConfig
                required={true}
                type={"mail"}
                id={"mail"}
                disabled={false}
                label={t("personal-informations-email")}
                value={mail}
                classes="px-6"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setMail(e.target.value)
                }
                hasImage={false}
                placeholder={user?.mail || ""}
              />
              <InputFieldConfig
                type={"tel"}
                id={"phone"}
                disabled={false}
                label={t("personal-informations-phone")}
                value={phone}
                classes="px-6"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPhone(e.target.value)
                }
                hasImage={false}
                placeholder={user?.phone || ""}
              />
              <label className="text-p font-montserrat px-6 flex flex-col col-span-2 w-full text-modal-grey dark:text-white">
                {t("personal-informations-desc")}
                <textarea
                  className={`text-p font-montserrat resize-none shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-full h-[10vh]  pl-4 py-3 focus:outline-none`}
                  id="desc"
                  value={desc}
                  spellCheck={true}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setDesc(e.target.value)
                  }
                  placeholder={user?.description || ""}
                />
              </label>
            </div>
            <SaveChangesButton onClick={() => saveChanges()}></SaveChangesButton>

          </div>
        </div>
        <div />
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
              <IconTrashBin classes={` ${!extenderBotaoDel ? "stroke-primary dark:stroke-secondary" : "stroke-contrast"}`} />
            </span>
            <AnimatePresence mode="wait">
              {extenderBotaoDel ? (
                <motion.p initial={{ width: 0 }} animate={{ width: "max-content" }} exit={{ width: 0 }} transition={{ duration: 0.2 }}
                  className="font-montserrat text-p w-max whitespace-nowrap overflow-clip lg:block hidden">
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
          <CenterModal condition={changeNameModal} setCondition={setChangeNameModal}>
            <ChangeAccountNameModal
              close={() => setChangeNameModal(false)}
            />
          </CenterModal>
          <CenterModal condition={changePasswordModal} setCondition={setChangePasswordModal}>
            <ChangePasswordModal
              close={() => setChangePasswordModal(false)}
            />
          </CenterModal>
          <ErrorModal title={t("change-owners")} setCondition={setError} message={t("you-are-owner")} condition={error} fnOk={() => setError(false)} />
        </div>
      </div>
      {
        sucess && (
          <div className="z-50 fixed inset-x-0 text-p font-montserrat mx-auto w-72 h-12 flex items-center justify-center bg-[#F2F2F2] dark:bg-[#333] text-black dark:text-white rounded shadow-md animate-fadeInOut notification slideUpAppear">
            {message}
          </div>
        )}
    </div>
  );
};
