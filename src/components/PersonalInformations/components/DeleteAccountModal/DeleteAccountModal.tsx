import { Button } from "@/components/Button"

type ModalDelete = {
    close: () => void,
    deleteUser: () => void
}

export const DeleteAccountModal = ({ close, deleteUser }: ModalDelete) => {
    return (
        <>
                <div className="w-full h-96 flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                    <div className="h-[70%] w-full flex flex-col items-center justify-around">
                        <h1 className="h3 text-primary dark:text-secondary ">Deletar conta</h1>
                        <div className="text-dark dark:text-white">
                            <p className="p text-center">Tem certeza de que deseja excluir sua conta?</p>
                            <p className="p text-center">Essa ação é irreversível!</p>
                        </div>
                    </div>
                    <div className="flex justify-around w-full">
                        <Button secondary text="Cancelar" fnButton={() => close()}></Button>
                        <Button fnButton={async () => {
                            deleteUser()
                            close()
                        }}></Button>
                    </div>
            </div>
        </>
    )

}