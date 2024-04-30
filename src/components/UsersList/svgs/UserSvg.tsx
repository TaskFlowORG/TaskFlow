import { useTheme } from "next-themes";

export const UserSvg = () => {
    const { theme } = useTheme();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="27" viewBox="0 0 24 27" fill="currentColor" className="text-[#333] dark:text-white stroke-none">
            <path d="M11.603 17.8555C17.8696 17.8555 23.1579 18.7904 23.1579 22.3976C23.1579 26.0062 17.8349 26.908 11.603 26.908C5.3379 26.908 0.0480957 25.973 0.0480957 22.3658C0.0480957 18.7573 5.37113 17.8555 11.603 17.8555ZM11.603 0.384766C15.8482 0.384766 19.2495 3.50658 19.2495 7.40154C19.2495 11.2965 15.8482 14.4196 11.603 14.4196C7.35932 14.4196 3.95657 11.2965 3.95657 7.40154C3.95657 3.50658 7.35932 0.384766 11.603 0.384766Z" />
        </svg>
    );
};
