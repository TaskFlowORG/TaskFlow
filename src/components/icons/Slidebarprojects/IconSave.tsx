export const IconSave = ({classes = "text-primary dark:text-secondary"}:{classes?:string}) => {
  return (
    <>
      <svg
        width="22"
        height="20"
        viewBox="0 0 65 43"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={" h-full w-full  stroke-none " + classes}
      >
        <path d="M22.0769 42.1555L0.951864 23.415C-0.317288 22.2891 -0.317288 20.4636 0.951864 19.3376L5.54795 15.2602C6.8171 14.1342 8.87502 14.1342 10.1442 15.2602L24.375 27.8846L54.8558 0.84442C56.125 -0.281473 58.1829 -0.281473 59.452 0.84442L64.0481 4.92183C65.3173 6.04772 65.3173 7.87323 64.0481 8.99923L26.6731 42.1556C25.4038 43.2815 23.346 43.2815 22.0769 42.1555Z" />
      </svg>
    </>
  );
};
