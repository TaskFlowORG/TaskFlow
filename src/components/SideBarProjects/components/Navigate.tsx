
interface Props {
  setCondition: (value: boolean) => void;
  modalPages: boolean;
}
export const Navigate = ({ modalPages, setCondition }: Props) => {
  return (
    <div className="w-full h-1 relative text-primary dark:text-secondary font-alata decoration-solid z-[60]">
      <span className="flex gap-2" onClick={() => setCondition(false)}>
        <span className="hover:underline cursor-pointer">Main</span>/
        {/* verificar para caso seja um grupo ou uma página certinho, pois ele sempre está vereficando como boolean true, então será sempre páginas*/}
        <span className="">{modalPages ? "Grupos" : "Páginas"}</span>
      </span>
    </div>
  );
};
