import { useTranslation } from "react-i18next";

export const Footer = () => {

    const {t} = useTranslation()
    const theme: string = "light";
    return (
        <div className="h-[250px] w-full bg-primary dark:bg-secondary flex justify-center flex-col items-center">

            <div className="h-5/6 w-4/5 lg:w-3/5 flex justify-between" >
                <div className="flex flex-col justify-center w-2/5">
                    <img src="/Assets/logo/iconDark.svg" alt="" className="h-[80px] lg:h-[128px] md:h-[100px] lg:w-[121px] md:w-[98px] w-[78px]" />
                    <p className=" font-alata h5 text-white">{t('organization-freedom')}</p>
                </div>

                <div className="flex flex-col justify-start w-[60%] lg:w-full ">
                    <div className=" h-full py-8 flex justify-between font-alata text-white items-end flex-col">
                        <a href="#headline">{t('meet-taskFlow')}</a>
                        <a href="#howworks">{t('taskflow-functionality')}</a>
                        <a href="#features">{t('our-features')}</a>
                        <a href="#devs">{t('meet-our-developers')}</a>
                        <a href="#principles">{t('principles')}</a>
                    </div>
                </div>
            </div>

            <div className="h-1/6 w-full bg-white dark:bg-back-grey flex justify-center items-center">
                    <p className="font-alata text-primary dark:text-white">{t('copyright')}</p>

                </div>

        </div>

    )
}

