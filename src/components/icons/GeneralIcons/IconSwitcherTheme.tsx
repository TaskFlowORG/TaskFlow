"use client";

import { useTheme } from "next-themes";

export const IconSwitcherTheme = () => {
  const { theme, setTheme } = useTheme();
  if (theme == "dark") {
    return (
      <svg
      onClick={() => setTheme("light")}
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer  hidden sm:block"
      >
        <path
          d="M10.6356 0.175781C9.89114 0.175781 9.30618 0.783084 9.30618 1.55601C9.30618 2.32894 9.89114 2.93625 10.6356 2.93625C11.3801 2.93625 11.9651 2.32894 11.9651 1.55601C11.9651 0.783084 11.3801 0.175781 10.6356 0.175781ZM3.98836 2.93625C3.24387 2.93625 2.65891 3.54355 2.65891 4.31648C2.65891 5.08941 3.24387 5.69671 3.98836 5.69671C4.73286 5.69671 5.31782 5.08941 5.31782 4.31648C5.31782 3.54355 4.73286 2.93625 3.98836 2.93625ZM17.2829 2.93625C16.5384 2.93625 15.9535 3.54355 15.9535 4.31648C15.9535 5.08941 16.5384 5.69671 17.2829 5.69671C18.0274 5.69671 18.6124 5.08941 18.6124 4.31648C18.6124 3.54355 18.0274 2.93625 17.2829 2.93625ZM10.6356 5.69671C7.71084 5.69671 5.31782 8.18113 5.31782 11.2176C5.31782 14.2542 7.71084 16.7386 10.6356 16.7386C13.5604 16.7386 15.9535 14.2542 15.9535 11.2176C15.9535 8.18113 13.5604 5.69671 10.6356 5.69671ZM1.32945 9.83741C0.58496 9.83741 0 10.4447 0 11.2176C0 11.9906 0.58496 12.5979 1.32945 12.5979C2.07395 12.5979 2.65891 11.9906 2.65891 11.2176C2.65891 10.4447 2.07395 9.83741 1.32945 9.83741ZM19.9418 9.83741C19.1973 9.83741 18.6124 10.4447 18.6124 11.2176C18.6124 11.9906 19.1973 12.5979 19.9418 12.5979C20.6863 12.5979 21.2713 11.9906 21.2713 11.2176C21.2713 10.4447 20.6863 9.83741 19.9418 9.83741ZM3.98836 16.7386C3.24387 16.7386 2.65891 17.3459 2.65891 18.1188C2.65891 18.8917 3.24387 19.499 3.98836 19.499C4.73286 19.499 5.31782 18.8917 5.31782 18.1188C5.31782 17.3459 4.73286 16.7386 3.98836 16.7386ZM17.2829 16.7386C16.5384 16.7386 15.9535 17.3459 15.9535 18.1188C15.9535 18.8917 16.5384 19.499 17.2829 19.499C18.0274 19.499 18.6124 18.8917 18.6124 18.1188C18.6124 17.3459 18.0274 16.7386 17.2829 16.7386ZM10.6356 19.499C9.89114 19.499 9.30618 20.1063 9.30618 20.8793C9.30618 21.6522 9.89114 22.2595 10.6356 22.2595C11.3801 22.2595 11.9651 21.6522 11.9651 20.8793C11.9651 20.1063 11.3801 19.499 10.6356 19.499Z"
            fill="#FCFCFC"
        />
      </svg>
    );
  }
  return (
    <svg
      onClick={() => setTheme("dark")}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer text-primary  hidden sm:block"
    >
      <path
        d="M17.958 12.5438C18.162 12.0578 17.579 11.6438 17.09 11.8598C16.1126 12.2889 15.0565 12.5095 13.989 12.5078C9.804 12.5078 6.412 9.18381 6.412 5.08281C6.41047 3.69815 6.80385 2.34178 7.546 1.17281C7.83 0.724809 7.489 0.104809 6.969 0.236809C2.96 1.25981 0 4.83181 0 9.08081C0 14.1278 4.175 18.2188 9.326 18.2188C13.226 18.2188 16.566 15.8738 17.958 12.5438Z"
      />
      <path
        d="M12.6144 0.321543C12.0844 -0.0324565 11.4524 0.599544 11.8054 1.12954L12.4354 2.07454C12.691 2.45771 12.8274 2.90797 12.8274 3.36854C12.8274 3.82912 12.691 4.27938 12.4354 4.66254L11.8054 5.60754C11.4524 6.13754 12.0854 6.76954 12.6154 6.41554L13.5594 5.78554C13.9426 5.52998 14.3929 5.39359 14.8534 5.39359C15.314 5.39359 15.7643 5.52998 16.1474 5.78554L17.0924 6.41554C17.6224 6.76954 18.2544 6.13754 17.9004 5.60754L17.2704 4.66254C17.0149 4.27938 16.8785 3.82912 16.8785 3.36854C16.8785 2.90797 17.0149 2.45771 17.2704 2.07454L17.9004 1.12954C18.2544 0.599544 17.6224 -0.0324565 17.0914 0.321543L16.1474 0.951544C15.7643 1.20711 15.314 1.34349 14.8534 1.34349C14.3929 1.34349 13.9426 1.20711 13.5594 0.951544L12.6144 0.321543Z"
      />
    </svg>
  );
};
