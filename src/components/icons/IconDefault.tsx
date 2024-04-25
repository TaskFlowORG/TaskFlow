import { ComponentProps, useState } from "react";
import { If } from "../If";
import { useTranslation } from "react-i18next";

interface Props extends ComponentProps<"svg"> {
  isDefault?: boolean;
}

export const IconDefault = ({ isDefault = true, ...props }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  return (
    <span
      className="w-full h-full "
      title={t("default")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <If condition={isDefault || isHovered}>
        <svg
          width="57"
          height="57"
          viewBox="0 0 57 57"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
          className={
            props.className + (!isDefault ? " opacity-50" : "")
          }
        >
          <path d="M28.5 57C12.7595 57 0 44.2405 0 28.5C0 12.7595 12.7595 0 28.5 0C44.2405 0 57 12.7595 57 28.5C57 44.2405 44.2405 57 28.5 57ZM21.9735 50.3509C19.1617 44.3868 17.5328 37.9341 17.177 31.35H5.8767C6.43127 35.7359 8.24768 39.8663 11.1052 43.2394C13.9628 46.6125 17.7384 49.083 21.9735 50.3509ZM22.8855 31.35C23.3158 38.3012 25.3023 44.8305 28.5 50.5932C31.7841 44.6782 33.7025 38.103 34.1145 31.35H22.8855ZM51.1233 31.35H39.8231C39.4672 37.9341 37.8383 44.3868 35.0265 50.3509C39.2616 49.083 43.0372 46.6125 45.8948 43.2394C48.7523 39.8663 50.5687 35.7359 51.1233 31.35ZM5.8767 25.65H17.177C17.5328 19.0659 19.1617 12.6132 21.9735 6.64905C17.7384 7.91696 13.9628 10.3875 11.1052 13.7606C8.24768 17.1337 6.43127 21.2641 5.8767 25.65ZM22.8884 25.65H34.1116C33.7005 18.8972 31.7831 12.3221 28.5 6.4068C25.2159 12.3218 23.2975 18.897 22.8855 25.65M35.0237 6.64905C37.8364 12.613 39.4663 19.0657 39.8231 25.65H51.1233C50.5687 21.2641 48.7523 17.1337 45.8948 13.7606C43.0372 10.3875 39.2616 7.91696 35.0265 6.64905" />
        </svg>
      </If>
    </span>
  );
};
