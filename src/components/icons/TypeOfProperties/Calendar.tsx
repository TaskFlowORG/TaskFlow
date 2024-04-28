export const IconCalendar = ({contrast}:{contrast?:boolean}) => {
    return (<svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={("h-full w-full ") + (contrast ? "text-contrast" : "text-primary dark:text-secondary")}>
        <path d="M10.9375 0C11.3519 0 11.7493 0.16462 12.0424 0.457646C12.3354 0.750671 12.5 1.1481 12.5 1.5625V3.125H37.5V1.5625C37.5 1.1481 37.6646 0.750671 37.9576 0.457646C38.2507 0.16462 38.6481 0 39.0625 0C39.4769 0 39.8743 0.16462 40.1674 0.457646C40.4604 0.750671 40.625 1.1481 40.625 1.5625V3.125H43.75C45.4076 3.125 46.9973 3.78348 48.1694 4.95558C49.3415 6.12769 50 7.7174 50 9.375V43.75C50 45.4076 49.3415 46.9973 48.1694 48.1694C46.9973 49.3415 45.4076 50 43.75 50H6.25C4.5924 50 3.00269 49.3415 1.83058 48.1694C0.65848 46.9973 0 45.4076 0 43.75V9.375C0 7.7174 0.65848 6.12769 1.83058 4.95558C3.00269 3.78348 4.5924 3.125 6.25 3.125H9.375V1.5625C9.375 1.1481 9.53962 0.750671 9.83265 0.457646C10.1257 0.16462 10.5231 0 10.9375 0ZM3.125 12.5V43.75C3.125 44.5788 3.45424 45.3737 4.04029 45.9597C4.62634 46.5458 5.4212 46.875 6.25 46.875H43.75C44.5788 46.875 45.3737 46.5458 45.9597 45.9597C46.5458 45.3737 46.875 44.5788 46.875 43.75V12.5H3.125Z" />
        <path d="M19.8286 39.5988V18.4131H17.6062C16.0145 19.3729 14.4763 20.442 13 21.6144V24.3748C14.3166 23.354 16.402 21.9123 17.4166 21.2887H17.4587V39.5988H19.8286ZM23.9994 34.4156C24.1644 36.9576 26.0848 40 29.9784 40C34.395 40 37 35.766 37 28.5969C37 20.9153 34.258 18 30.1434 18C26.8923 18 23.8344 20.6691 23.8344 25.1851C23.8344 29.7924 26.7273 32.2152 29.7185 32.2152C32.3376 32.2152 34.0369 30.7218 34.574 29.0774H34.6688C34.6548 34.3044 33.0503 37.6725 30.0872 37.6725C27.756 37.6725 26.5483 35.8852 26.4008 34.4156H23.9994ZM34.3669 25.2129C34.3669 27.9773 32.4043 29.8996 30.2101 29.8996C28.1001 29.8996 26.1937 28.3784 26.1937 25.1334C26.1937 21.8646 28.237 20.3275 30.2943 20.3275C32.5167 20.3275 34.3669 21.9083 34.3669 25.2129Z" />
    </svg>
    )
}