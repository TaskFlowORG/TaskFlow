"use client"

import { ModalTarefa } from '@/components/ModalTarefa'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    console.log('oi')
  }, [])

  return (
    <div className='h-screen w-screen flex justify-center items-center'>


      <div className="w-3/6 h-4/6 bg-white flex justify-center items-center rounded-sm">
        <div className="w-5/6 h-5/6 grid grid-cols-2">
          <div className="w-full h-full">
            <input type="text" className=" w-full h-16 h3 text-modal-grey border-none  outline-none focus:shadow-blur-10 p-2 rounded-md" placeholder="Nome da Tarefa" />
            <div className="w-full h-2/6">

            </div>
            <div className="w-[421px] h-[226px]"></div>
          </div>

          <div className="w-full h-full flex flex-col gap-3">
            <div className="w-full h-16">
              <div className="modalTaskwhite">
                <img src="./Assets/pages/modalTarefas/icon.svg" alt="" />
              </div>
            </div>
            <div className="w-full h-[150px] flex flex-row gap-5 items-center">

              <div className="w-16 h-16 modalTaskDisplay">
                <div className="modalTaskwhite">
                  <img src="./Assets/pages/modalTarefas/T.svg" alt="" />
                </div>

              </div>

              <div className='h-full w-5/6'>
                <p className='h4'> Descrição</p>
                  <textarea name="" id="" cols="30" rows="4" className='w-full resize-none bg-input-grey rounded-md p-2
                   outline-none focus:shadow-blur-10'></textarea>
              </div>
            </div>
            <div className="w-full h-[107px] modalTaskDisplay">
              <div className="modalTaskwhite">
                <img src="./Assets/pages/modalTarefas/etiqueta.svg" alt="" />
              </div>
            </div>
            <div className="w-full h-16 modalTaskDisplay">
              <div className="modalTaskwhite">
                <img src="./Assets/pages/modalTarefas/calendar.svg" alt="" />
              </div>
            </div>
            <div className="w-full h-16 modalTaskDisplay">
              <div className="modalTaskwhite">
                <img src="./Assets/pages/modalTarefas/selecao.svg" alt="" />
              </div>
            </div>
            <div className="w-full h-16 modalTaskDisplay">
              <div className="modalTaskwhite">
                <img src="./Assets/pages/modalTarefas/progresso.svg" alt="" />
              </div>
            </div>
            <div className="w-full h-16 modalTaskDisplay">
              <div className="modalTaskwhite">
                <img src="./Assets/pages/modalTarefas/radio.svg" alt="" />
              </div>
            </div>


          </div>
        </div>


      </div>
    </div>

  )
}
