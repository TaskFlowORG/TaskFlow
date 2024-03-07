interface Props {
  setTextField: (textField: string) => any;
  action: () => any;
}

export const SearchInput = ({ setTextField, action }: Props) => {
  return (
    <div className="w-4/5 flex justify-between dark:bg-modal-grey bg-white rounded-xl border-primary dark:border-secondary border-b-[1px] px-4">
      <div className="gap-4 flex ">
        <img src="/search.svg" alt="" onClick={() => action()} />
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
        <img src="/keyboard.svg" alt="" />
        <img src="/voice.svg" className="pr-2" alt="" />
      </div>
    </div>
  );
};
