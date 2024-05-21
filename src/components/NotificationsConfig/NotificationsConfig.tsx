import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { userService } from '@/services';
import { Configuration, User, UserPut } from '@/models';
import { InputConfig } from './components/InputConfig';
import { UserContext } from '@/contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { useAsyncThrow } from '@/hooks/useAsyncThrow';


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
    const asynThrow = useAsyncThrow();

    const { t } = useTranslation();
    
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
            const updatedUser = await userService.patch(user).catch(asynThrow);
            if(updatedUser)
            setUser(updatedUser);
        }
    }

    return (
        <div className="flex items-center w-fit h-full ">
            <div className="flex justify-center w-full h-[80%]">
                <div className="w-[85%] lg:grid pb-14 lg:grid-cols-2 lg:grid-rows-4 gap-10 flex flex-col lg:justify-center items-center lg:h-fit h-[110rem]">
                    <div className="flex justify-between col-span-2 row-start-1 w-full">
                        <div>
                            <h2 className="text-h2 font-alata text-primary dark:text-secondary">{t("notifications-side-bar")}</h2>
                        </div>
                        <div className="flex items-end py-4 font-bold ">
                            <label className="relative w-16 h-8">
                                <input id='notifications' onChange={(e) => updateBack(e, 'notifications')} type="checkbox" className="opacity-0 w-0 h-0 toggle-input" checked={notifications} />
                                <span className=" absolute top-0 right-0 bottom-0 left-0  cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] before:absolute before:w-6 before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                            </label>
                        </div>
                    </div>
                    <InputConfig notifications={notifications} id='notificTasks' type='checkbox' onChange={(e) => updateBack(e, 'notificTasks')} checked={notificTasks} title={t("notification-task-config")} description={t("notification-task-desc")}/>
                    <InputConfig notifications={notifications} id='notificAtAddMeInAGroup' type='checkbox' onChange={(e) => updateBack(e, 'notificAtAddMeInAGroup')} checked={notificAtAddMeInAGroup} title={t("notification-group")} description={t("notification-group-desc")} />
                    <InputConfig notifications={notifications} id='notificWhenChangeMyPermission' type='checkbox' onChange={(e) => updateBack(e, 'notificWhenChangeMyPermission')} checked={notificWhenChangeMyPermission} title={t("notification-permission-config")}  description={t("notification-permission-desc")} />
                    <InputConfig notifications={notifications} id='notificMyPointsChange' type='checkbox' onChange={(e) => updateBack(e, 'notificMyPointsChange')} checked={notificMyPointsChange} title={t("notification-points-config")}  description={t("notification-points-desc")} />
                    <InputConfig notifications={notifications} id='notificSchedules' type='checkbox' onChange={(e) => updateBack(e, 'notificSchedules')} checked={notificSchedules} title={t("notification-scheduling")} description={t("notification-scheduling-desc")}/>
                    <InputConfig notifications={notifications} id='notificDeadlines' type='checkbox' onChange={(e) => updateBack(e, 'notificDeadlines')} checked={notificDeadlines} title={t("notification-deadline-config")} description={t("notification-deadline-desc")} />
                    <InputConfig notifications={notifications} id='notificChats' type='checkbox' onChange={(e) => updateBack(e, 'notificChats')} checked={notificChats} title={t("notification-comments")}description={t("notification-comments-desc")}/>
                    <InputConfig notifications={notifications} id='notificComments' type='checkbox' onChange={(e) => updateBack(e, 'notificComments')} checked={notificComments} title={t("notification-messages")} description={t("notification-messages-desc")}/>
                </div>
            </div>
        </div>
    );
}