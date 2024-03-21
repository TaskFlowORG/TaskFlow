import Image from "next/image";

interface Props {
  setTextField: (textField: string) => any;
  action: () => any;
}

export const SearchInput = ({ setTextField, action }: Props) => {
  return (
    <div className="w-4/5  flex justify-between dark:bg-modal-grey bg-white rounded-xl border-primary dark:border-secondary border-b-[1px] px-4">
      <div className="gap-4 flex  ">
        <Image
          src="/search.svg"
          alt="search"
          height={24}
          width={24}
          className="self-center"
          onClick={() => action()}
        />
        <p>|</p>
      </div>
      <input
        type="text"
        id="textSearch"
        
        className="w-full h-full outline-none dark:bg-modal-grey bg-white text-modal-grey dark:text-white"
        onKeyUp={action()}
        onChange={(e) => {
          setTextField(e.target.value);
        }}
      />
      <div className="gap-3 flex">
        <Image src="/keyboard.svg" className="self-center " alt="keyboard"  width={24} height={24}/>
        <Image src="/voice.svg" className="self-center " alt="voice"   width={24} height={24} />
      </div>
    </div>
  );
};
