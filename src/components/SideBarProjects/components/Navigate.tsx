
interface Props {
    setCondition: (value: boolean) => void;
    modalPages: boolean;
    }
export const Navigate = ({modalPages, setCondition}:Props) => {
  return (
    <div className="w-full h-1 relative text-primary dark:text-secondary font-alata decoration-solid z-[60]">
        <span className="flex gap-2" onClick={() => setCondition(false)}>
          <span className="hover:underline cursor-pointer">Main</span>/
          <span className="">{modalPages?"Pages":"Groups"}</span>
        </span>
    </div>
  );
};
