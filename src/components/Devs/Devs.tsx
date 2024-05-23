import { Dev } from "@/components/Dev";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

export const Devs = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { theme } = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
    const swiperNext = document.querySelector(".swiper-button-next");

    if (swiperNext != null) {
      swiperNext.classList.add("ooo");
    }
  }, []);

  function changeView(): number {
    return windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1;
  }
  const devs = [
    {
      name: "Jonatas",
      description:
        "Sou um profissional de tecnologia em programação e design UX/UI, com experiência em front-end e back-end, focado em criar soluções inovadoras para os usuários.",
      links: [
        "https://www.linkedin.com/in/jonatas-jackson-gon%C3%A7alves-554661274/",
        "https://github.com/Jonatass06",
      ],
    },
    {
      name: "Luka",
      description:
        "Criando soluções modernas e intuitivas! Focado em criar códigos acessíveis para todos os usuários, sem perder a qualidade estética e sempre inovando.",
      links: [
        "https://www.linkedin.com/in/gabriel-luka-00390230b/",
        "https://github.com/GabrielLukaA",
      ],
    },
    {
      name: "Heloísa",
      links: [
        "https://www.linkedin.com/in/helo%C3%ADsa-foga%C3%A7a/",
        "https://github.com/heloisaFogaca",
      ],
      description:
        "A essência do meu trabalho está na paixão pela inovação, na busca incessante por novas formas de fazer as coisas, sempre com dedicação e comprometimento.",
    },
    {
      name: "Becker",
      links: [
        "https://www.linkedin.com/in/matheus-becker-74a00a295/",
        "https://github.com/BeckerMM",
      ],
      description:
        "Cada linha de código tem o poder de transformar o mundo, tornando o desenvolvedor um arquiteto de soluções, artista da inovação e guardião da excelência técnica.",
    },
    {
      name: "Marquardt",
      links: [
        "https://www.linkedin.com/in/maquardtt/",
        "https://github.com/Marquardtt",
      ],
      description:
        "No mundo do software, a única limitação é a sua imaginação. Transforme linhas de código em novas soluções que moldarão o futuro.",
    },
  ];

  return (
    <div
      className="w-full flex flex-col items-center gap-[5rem] py-10 "
      id="devs"
    >
      <h2 className="h3 w-full text-primary lg:text-[48px] dark:text-white  text-center ">
        {t("meet-our-developers")}
      </h2>

      <div className="flex gap-3 h-max items-center">
        <Swiper
          className="flex  gap-8 max-w-[340px] md:max-w-[700px]  lg:max-w-[1000px]  h-max items-center w-full justify-center"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={changeView()}
          navigation={{
            prevEl: ".swiper-button-prevs",
            nextEl: ".swiper-button-nexts",
          }}
          pagination={{ clickable: true }}
        >
          {devs.map((slide, index) => {
            return (
              <SwiperSlide key={index} className="">
                <Dev
                  name={slide.name}
                  description={slide.description}
                  links={slide.links}
                />
              </SwiperSlide>
            );
          })}
          <div
            className={`swiper-button-prevs ${
              theme == "dark"
                ? "swiper-type-of-page-k"
                : "swiper-type-of-page-s"
            }`}
          ></div>
          <div
            className={`swiper-button-nexts ${
              theme == "dark"
                ? "swiper-type-of-page-k"
                : "swiper-type-of-page-s"
            }`}
          ></div>
        </Swiper>
      </div>
    </div>
  );
};
