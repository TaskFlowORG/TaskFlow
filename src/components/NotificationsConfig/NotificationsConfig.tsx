import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { userService } from '@/services';
import { Configuration, User, UserPut } from '@/models';
import { InputConfig } from './components/InputConfig';
import { UserContext } from '@/contexts/UserContext';


export const NotificationsConfig = () => {
    const { user, setUser } = useContext(UserContext);
    const [notifications, setNotifications] = useState<boolean | undefined>(user?.configuration.notifications);
    const [notificTasks, setNotificTasks] = useState<boolean | undefined>(user?.configuration.notificTasks);
    const [notificAtAddMeInAGroup, setNotificAtAddMeInAGroup] = useState<boolean | undefined>(user?.configuration.notificAtAddMeInAGroup);
    const [notificWhenChangeMyPermission, setNotificWhenChangeMyPermission] = useState<boolean | undefined>(user?.configuration.notificWhenChangeMyPermission);
    const [notificMyPointsChange, setNotificMyPointsChange] = useState<boolean | undefined>(user?.configuration.notificMyPointsChange);
    const [notificSchedules, setNotificSchedules] = useState<boolean | undefined>(user?.configuration.notificSchedules);
    const [notificDeadlines, setNotificDeadlines] = useState<boolean | undefined>(user?.configuration.notificDeadlines);
    const [notificChats, setNotificChats] = useState<boolean | undefined>(user?.configuration.notificChats);
    const [notificComments, setNotificComments] = useState<boolean | undefined>(user?.configuration.notificComments);

    //Não existe ainda
    //const [initialPageTasksPerDeadline, setInitialPageTasksPerDeadline] = useState<boolean>(false);

    const updateBack = async (e: ChangeEvent<HTMLInputElement>, id: string) => {
        if(!user || !setUser) return;
        if (e.target.id == id) {
            switch (id) {
                case 'notifications':
                    setNotifications(e.target.checked);
                    break;

                case 'notificTasks':
                    setNotificTasks(e.target.checked);
                    break;

                case 'notificAtAddMeInAGroup':
                    setNotificAtAddMeInAGroup(e.target.checked);
                    break;

                case 'notificWhenChangeMyPermission':
                    setNotificWhenChangeMyPermission(e.target.checked);
                    break;

                case 'notificMyPointsChange':
                    setNotificMyPointsChange(e.target.checked);
                    break;

                case 'notificSchedules':
                    setNotificSchedules(e.target.checked);
                    break;

                case 'notificDeadlines':
                    setNotificDeadlines(e.target.checked);
                    break;

                case 'notificChats':
                    setNotificChats(e.target.checked);
                    break;

                case 'notificComments':
                    setNotificComments(e.target.checked);
                    break;
            }
            user.configuration[id] = e.target.checked;
            const updatedUser = await userService.patch(user);
            setUser(updatedUser);
        }
    }
    
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex justify-center w-full h-[80%]">
                <div className="w-[80%] md:grid grid-cols-2 grid-rows-4 gap-10 ">
                    <div className="flex justify-between items-center col-span-2 row-start-1">
                        <h2 className="h2 text-primary dark:text-secondary">Mostrar notificações</h2>
                        <div className="flex items-center py-4 font-bold ">
                            <label className="relative w-16 h-8 ml-4 mr-4">
                                <input id='notifications' onChange={(e) => updateBack(e, 'notifications')} type="checkbox" className="opacity-0 w-0 h-0 toggle-input" checked={notifications} />
                                <span className=" absolute top-0 right-0 bottom-0 left-0  cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] before:absolute before:w-6 before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                            </label>
                        </div>
                    </div>
                    <InputConfig notifications={notifications} id='notificTasks' type='checkbox' onChange={(e) => updateBack(e, 'notificTasks')} checked={notificTasks} title="Notificação de Tarefas" description="Receba notificações sempre que uma tarefa for alterada, criada ou removida de seus projetos para manter-se atualizado(a)." />
                    <InputConfig notifications={notifications} id='notificAtAddMeInAGroup' type='checkbox' onChange={(e) => updateBack(e, 'notificAtAddMeInAGroup')} checked={notificAtAddMeInAGroup} title="Adição em grupos" description="Ao ser adicionado(a) a algum grupo, você receberá uma notificação para estar ciente da inclusão." />
                    <InputConfig notifications={notifications} id='notificWhenChangeMyPermission' type='checkbox' onChange={(e) => updateBack(e, 'notificWhenChangeMyPermission')} checked={notificWhenChangeMyPermission} title="Mudança de permissões" description="Sempre que houver alteração em suas permissões em algum projeto, você receberá uma notificação e será informado sobre qual permissão foi modificada." />
                    <InputConfig notifications={notifications} id='notificMyPointsChange' type='checkbox' onChange={(e) => updateBack(e, 'notificMyPointsChange')} checked={notificMyPointsChange} title="Pontuação" description="Quando você alcançar uma determinada pontuação em nosso sistema, receberá uma notificação para ficar informado sobre seu progresso." />
                    <InputConfig notifications={notifications} id='notificSchedules' type='checkbox' onChange={(e) => updateBack(e, 'notificSchedules')} checked={notificSchedules} title="Agendamentos" description="Quando você agenda uma tarefa ou projeto em nossa plataforma, você será notificado sobre quaisquer alterações, criações ou remoções de tarefas relacionadas aos seus projetos." />
                    <InputConfig notifications={notifications} id='notificDeadlines' type='checkbox' onChange={(e) => updateBack(e, 'notificDeadlines')} checked={notificDeadlines} title="Prazo limite" description="Quando a data de conclusão de um projeto ou tarefa estiver próxima, você será alertado(a) para garantir que possa acompanhar de perto e cumprir todos os prazos importantes." />
                    <InputConfig notifications={notifications} id='notificChats' type='checkbox' onChange={(e) => updateBack(e, 'notificChats')} checked={notificChats} title="Comentários" description="Quando uma tarefa pela qual você é responsável receber um comentário, você será notificado(a) imediatamente." />
                    <InputConfig notifications={notifications} id='notificComments' type='checkbox' onChange={(e) => updateBack(e, 'notificComments')} checked={notificComments} title="Mensagens" description="Quando você receber alguma mensagem em seus chats, será notificado disso no mesmo momento." />
                </div>
            </div>
        </div>
    );
}