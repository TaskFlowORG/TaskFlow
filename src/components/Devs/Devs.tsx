import { Dev } from "@/components/Dev";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useEffect, useState } from "react";

export const Devs = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
    const swiperNext = document.querySelector(".swiper-button-next");

    if (swiperNext != null) {
      swiperNext.classList.add("ooo");
      swiperNext.addEventListener("click", (e) => {
        // console.log("bomdia"); // logs `false`
      });
    }
  }, []);

  function changeView(): number {
    return windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1;
  }
  const devs = [
    {
      name: "Jonatas",
      description:
        "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra",
    },
    {
      name: "Luka",
      description:
        "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra",
    },
    {
      name: "Heloísa",
      description:
        "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra",
    },
    {
      name: "Becker",
      description:
        "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra",
    },
    {
      name: "Marquardt",
      description:
        "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-[5rem] py-10">
      <h2
        onClick={() => {
          // console.log(document.querySelector(".swiper-button-next"));
        }}
        className="h3 w-full text-primary lg:text-[48px] dark:text-white  text-center "
      >
        Conheça nossos desenvolvedores!
      </h2>

      <div className="flex gap-3 h-max items-center">
        <Swiper
          className="flex  gap-8 max-w-[340px] md:max-w-[700px]  lg:max-w-[1000px]  h-max items-center w-full justify-center"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={changeView()}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper: any) => console.log(swiper)}
          onSlideChange={(swiper: any) => console.log(swiper.activeIndex)}
        >
          {devs.map((slide, index) => {
            return (
              <SwiperSlide key={index} className="">
                <Dev name={slide.name} description={slide.description} />
              </SwiperSlide>
            );
          })}
          <div className="swiper-button-prev "></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
};
