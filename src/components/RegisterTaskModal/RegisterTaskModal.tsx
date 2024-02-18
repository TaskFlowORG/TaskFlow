
import { Input } from '../Input';
import { useState } from 'react';
import {InputText} from '@/components/Properties/InputText/InputText';
import style from './RegisterTaskModal.module.css';
import { InputNumber } from '../Properties/InputNumber';
import { InputDate } from '../Properties/InputDate/InputDate';
import { InputRadio } from '../Properties/InputRadio';
import { InputProgress } from '../Properties/InputProgress';
import { Property, TypeOfProperty } from '@/models';

type RegisterTaskModalProps = {
    open: boolean;
    listInputs: Property[];
    close: any;

}

export const RegisterTaskModal = ({ open = false, listInputs = [], close }: RegisterTaskModalProps) => {

    const [isVisible, setVisible] = useState(false);

    return (
        <>
            {open &&
                <div className="h-screen w-screen absolute z-10 top-0 right-0 left-0 bottom-0 items-center justify-center flex backdrop-blur-sm">

                    <div className="w-[60%] h-[85%] bg-white flex flex-col items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                        <div className="w-full rounded-sm  h-1 mb-4">
                            <div className={(isVisible ? " w-full " : " w-1/2") + " h-1 rounded-r-full border-l-sm bg-primary dark:bg-secondary duration-500"} ></div>
                        </div>
                        <div className="h-[5%] w-full flex justify-end items-center">
                            <p className='  p-[8%] lg:p-[4%] text-2xl hover:text-red-500 cursor-pointer' onClick={close}>x</p>
                        </div>

                        <div className='h-[80%] w-[90%]'>
                            {!isVisible &&
                                <div className="w-full h-full border-input-grey-opacity dark:border-back-grey flex flex-col  items-center justify-center lg:justify-start lg:items-start">
                                    <Input register={undefined} className="h-[10%] w-[50%] outline-none"
                                        classNameInput={'h-full w-full outline-none bg-transparent border-b-4 border-input-grey-opacity dark:border-back-grey text-3xl'}
                                        placeholder="Nome da Tarefa" />
                                    <div className="w-full h-[40%] ">

                                    </div>
                                    <div className="w-full h-[40%]">

                                    </div>

                                </div>
                            }
                            {isVisible &&
                                <div className="w-full h-full flex flex-col gap-5">

                                    {listInputs.map((property) => {
                                        return (
                                            <>
                                            
                                                {property.type == TypeOfProperty.TEXT && <InputText property={property}/> || 
                                                    property.type == TypeOfProperty.DATE && <InputDate property={property}/>||
                                                    property.type == TypeOfProperty.NUMBER && <InputNumber property={property}/>||
                                                    property.type == TypeOfProperty.CHECKBOX && <Input register={undefined} placeholder={property.name} classNameInput={''}></Input> ||
                                                    property.type == TypeOfProperty.SELECT && <Input register={undefined} placeholder={property.name} classNameInput={''}></Input> ||
                                                    property.type == TypeOfProperty.RADIO && <InputRadio property={property}/> ||
                                                    property.type == TypeOfProperty.PROGRESS && <InputProgress property={property}/>
                                                
                                                }
                                            </>
                                        )
                                    })}

                                </div>
                            }
                        </div>

                        <div className='w-[90%] h-[10%] flex items-center'>
                            {isVisible ?
                                <div className='w-full h-full flex justify-between'>
                                    <button className='w-[15%] h-[50%] bg-primary dark:bg-secondary rounded-md text-white' onClick={() => setVisible(false)}>Voltar</button>
                                    <button className='w-[15%] h-[50%] bg-primary dark:bg-secondary rounded-md text-white' >Salvar</button>
                                </div>
                                :
                                <div className='w-full h-full flex justify-end'>
                                    <button className='w-[15%] h-[50%] bg-primary dark:bg-secondary  hover:bg-light-pink  rounded-md text-white' onClick={() => { setVisible(true) }}>Próximo</button>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            }
        </>
    )
}