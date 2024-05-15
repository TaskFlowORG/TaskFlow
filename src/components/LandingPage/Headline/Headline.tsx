import { useTranslation } from "react-i18next";
import { Button } from "../../Button";
import Link from "next/link";

export const Headline = () => {
  const {t} = useTranslation()
  return (
    <div
      className={`flex flex-col lg:w-1/2 1.5xl:w-1/3 p-4 md:p-6 gap-6 relative `}
    
    >
      <h1 className="text-primary dark:text-white h2 lg:text-[56px] 1.5xl:whitespace-nowrap">
      {t('meet-taskFlow')
}
      </h1>
      <p className="md:text-[16px] text-modal-grey dark:text-white  mn whitespace-normal">
{t('taskFlow-intro')
}      </p>
      <Link href={"/register"}>
        <Button
          width={"w-min"}
          text={t('start-now')}
          padding={"px-6"}
          other={"md:text-[16px] md:px-12 lg:text-[20px] dark:bg-secondary"}
          textSize={"text-[14px]"}
        />
      </Link>
    </div>
  );
};
