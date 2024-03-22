interface Props {fnButton: () => void, text:string, icon:React.ReactNode}

export const ButtonPageOption = ({fnButton, text, icon}:Props) => {
    return (
        <button className="w-min h-min items-center flex gap-4 dark:bg-back-grey text-[16px]"
                onClick={fnButton} >
                <span className="stroke-modal-grey dark:stroke-white w-4 h-4">{icon}</span>
                <span className="w-px h-4 bg-modal-grey" />
                <span className="whitespace-nowrap">{text}</span>
              </button>
    );
    }