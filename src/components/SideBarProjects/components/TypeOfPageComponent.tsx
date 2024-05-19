import { If } from "../../If";
import { Button } from "../../Button";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTheme } from "next-themes";
import { TypeOfPage } from "@/models";
import { PageTypeIcons } from "../../icons";
import { useTranslation } from "next-i18next";
import { Info } from "@/components/Info";
interface Props {
  changingType: boolean;
  closeModals: () => void;
  setChangingType: (value: boolean) => void;
  changeType: () => Promise<void>;
  type: TypeOfPage;
  setType: (value: TypeOfPage) => void;
}
export const TypeOfPageComponent = ({
  changingType,
  closeModals,
  setChangingType,
  type,
  changeType,
  setType,
}: Props) => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const swiperType = (s: any) => {
    switch (s.activeIndex) {
      case 0:
        setType(TypeOfPage.KANBAN);
        break;
      case 1:
        setType(TypeOfPage.CALENDAR);
        break;
      case 2:
        setType(TypeOfPage.TIMELINE);
        break;
      case 3:
        setType(TypeOfPage.LIST);
        break;
      case 4:
        setType(TypeOfPage.TABLE);
        break;
      case 5:
        setType(TypeOfPage.CANVAS);
        break;
    }
  };

  return (
    <div className="flex page-view-type gap-3 h-max items-center relative bg-white dark:bg-modal-grey p-2 rounded-md flex-col">
      <span className="w-min h-min absolute top-2 left-2">
        <Info
          text={type.toLowerCase() + "-info"}
          right
          title={type.toLowerCase()}
        />
      </span>
      <Swiper
        className={" p-6 max-w-[6rem] min-h-[9rem] flex justify-center ".concat(
          theme == "dark"
            ? "swiper-type-of-page-dark"
            : "swiper-type-of-page-light"
        )}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onSlideChange={swiperType}
        onSwiper={(swiper) => swiperType(swiper)}
        pagination={{ clickable: true }}
      >
        {[
          { title: TypeOfPage.KANBAN, image: "" },
          { title: TypeOfPage.CALENDAR, image: "" },
          { title: TypeOfPage.TIMELINE, image: "" },
          { title: TypeOfPage.LIST, image: "" },
          { title: TypeOfPage.TABLE, image: "" },
          { title: TypeOfPage.CANVAS, image: "" },
        ].map((slide) => {
          return (
            <SwiperSlide key={`${slide.title}`}>
              <div className="h-32 flex items-center text-modal-grey relative dark:text-white flex-col whitespace-nowrap gap-1 ">
                <p className="w-full text-center text-p font-alata h-12 flex items-center justify-center  whitespace-pre-wrap">
                  {t(slide.title.toLowerCase())}
                </p>
                <div className="w-14 h-14">
                  <PageTypeIcons type={t(slide.title)} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div
          className={
            "swiper-button-prev " +
            (theme == "dark"
              ? "swiper-type-of-page-dark"
              : "swiper-type-of-page-light")
          }
        ></div>
        <div
          className={
            "swiper-button-next " +
            (theme == "dark"
              ? "swiper-type-of-page-dark"
              : "swiper-type-of-page-light")
          }
        ></div>
      </Swiper>
      <div className=" w-full flex justify-around gap-2">
        <Button
          text={t("cancel")}
          padding="p-1"
          rounded="rounded-sm"
          paddingY="py-0"
          textSize="text-mn"
          fnButton={() => {
            setChangingType(false);
          }}
        />
        <Button
          text={t("conclude")}
          padding="p-1"
          fnButton={() => {
            changeType();
            setChangingType(false);
          }}
          rounded="rounded-sm"
          paddingY="py-0"
          textSize="text-mn"
          secondary
        />
      </div>
    </div>
  );
};
