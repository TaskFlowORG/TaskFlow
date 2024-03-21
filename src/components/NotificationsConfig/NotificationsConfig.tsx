"use client"

import React, { useState } from 'react';

export const NotificationsConfig = () => {
    const [toggle, setToggle] = useState(false);

    const toggleNotifications = () => {
        setToggle(!toggle);
    }

    const ToggleItem = ({ title, description }: { title: string, description: string }) => (
        <div className={` ${toggle ? "opacity-100" : "opacity-50"}`}>
            <div className="w-full flex items-center justify-between row-start-3 ">
                <h4 className="h4 text-modal-grey">{title}</h4>
                <div className="flex items-center py-4 font-bold ">
                    <label className="relative w-16 h-8 ml-4 mr-4">
                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input" disabled={!toggle} />
                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                            before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                    </label>
                </div>
            </div>
            <div>
                <p className="p">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full">
            <div className="flex justify-center h-full">
                <div className="w-[80%] md:grid grid-cols-2 grid-rows-4 gap-10 sm:">
                    <div className="flex justify-between items-center col-span-2 row-start-1">
                        <h2 className="h2 text-secondary">Mostrar notificações</h2>
                        <div className="flex items-center py-4 font-bold ">
                            <label className="relative w-16 h-8 ml-4 mr-4">
                                <input onClick={toggleNotifications} id="mostrarNotificacoes" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                <span className=" absolute top-0 right-0 bottom-0 left-0  cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] before:absolute before:w-6 before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                            </label>
                        </div>
                    </div>
                    <ToggleItem title="Notificação de Tarefas" description="Receba notificações sempre que uma tarefa for alterada, criada ou removida de seus projetos para manter-se atualizado(a)." />
                    <ToggleItem title="Adição em grupos" description="Ao ser adicionado(a) a algum grupo, você receberá uma notificação para estar ciente da inclusão." />
                    <ToggleItem title="Mudança de permissões" description="Sempre que houver alteração em suas permissões em algum projeto, você receberá uma notificação e será informado sobre qual permissão foi modificada." />
                    <ToggleItem title="Pontuação" description="Quando você alcançar uma determinada pontuação em nosso sistema, receberá uma notificação para ficar informado sobre seu progresso." />
                    <ToggleItem title="Agendamentos" description="Quando você agenda uma tarefa ou projeto em nossa plataforma, você será notificado sobre quaisquer alterações, criações ou remoções de tarefas relacionadas aos seus projetos." />
                    <ToggleItem title="Prazo limite" description="Quando a data de conclusão de um projeto ou tarefa estiver próxima, você será alertado(a) para garantir que possa acompanhar de perto e cumprir todos os prazos importantes." />
                    <ToggleItem title="Comentários" description="Quando uma tarefa pela qual você é responsável receber um comentário, você será notificado(a) imediatamente." />
                    <ToggleItem title="Mensagens" description="Quando a data de conclusão de um projeto ou tarefa estiver próxima, você será alertado(a) para garantir que possa acompanhar de perto e cumprir todos os prazos importantes." />
                </div>
            </div>
        </div>
    );
}
