import { Property } from '@/model/Properties/Property';
import { Input } from '../Input';
type RegisterTaskModalProps = {
    open: boolean;
    listInputs: Property[];
    close: any;

}

export const RegisterTaskModal = ({ open = false, listInputs = [], close }: RegisterTaskModalProps) => {



    return (
        <>
            {open &&
                <div className="h-screen w-screen absolute z-10 top-0 right-0 left-0 bottom-0 items-center justify-center flex backdrop-blur-sm">

                    <div className="w-[90%] h-[90%] bg-white flex flex-col items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                        <div className="h-[10%] w-full flex justify-end items-center">
                            <p className='h-0 w-0 p-[8%] lg:p-[4%] text-2xl hover:text-red-500 cursor-pointer' onClick={close}>X</p>
                        </div>
                        <div className="w-[90%] h-[80%] flex flex-col justify-center lg:grid lg:grid-cols-2">
                            <div className="w-full h-full lg:border-r-4 border-input-grey-opacity dark:border-back-grey flex flex-col  items-center justify-center lg:justify-start lg:items-start">
                                <Input register={undefined} className="h-[10%] w-[90%] outline-none"
                                    classNameInput={'h-full w-full outline-none bg-transparent border-b-4 border-input-grey-opacity dark:border-back-grey text-3xl'}
                                    placeholder="Nome da Tarefa" />
                                <div className="w-[90%] h-[40%]">

                                </div>
                                <div className="w-[90%] h-[35%]"></div>
                            </div>

                            <div className="w-full h-full">

                                {listInputs.map((property) => {
                                    return (
                                        <>
                                            {property.type.toString() == "TEXT" && <Input register={undefined} placeholder={property.name} classNameInput={''}></Input>}
                                        </>
                                    )
                                })}

                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}