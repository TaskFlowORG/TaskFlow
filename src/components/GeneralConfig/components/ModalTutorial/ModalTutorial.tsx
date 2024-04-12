import { Button } from "@/components/Button"

type ModalTutorial = {
    close: () => void,
    updateTutorial: () => void
}

export const ModalTutorial = ({close, updateTutorial }: ModalTutorial) => {
    
    return (
        <>
            <div className="w-full h-96 flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                <div className="h-[70%] w-full flex flex-col items-center justify-around">
                    <h1 className="h3 text-primary dark:text-secondary ">Refazer o tutorial</h1>
                    <div className="text-dark dark:text-white">
                        <p className="p text-center">"Tem certeza de que deseja refazer o tutorial"</p>
                    </div>
                </div>
                <div className="flex justify-around w-full">
                    <Button secondary text="Cancelar" fnButton={() => close()}></Button>
                    <Button text="Confirmar" fnButton={async () => {
                        updateTutorial()
                        close()
                    }}></Button>
                </div>
            </div>
        </>
    )

}