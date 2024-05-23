import { Date as DateProp, TaskPage } from "@/models";
import { CenterModal } from "../../../Modal";
import { If } from "../../../If";
// import { TaskTagCalendar } from "./TaskTagCalendar";
// import { Scrollable } from "./Scrollable";
import { log } from "console";
import { Scrollable } from "@/components/Pages/components/Calendar/Scrollable";
import { TaskTagCalendar } from "@/components/Pages/components/Calendar/TaskTagCalendar";

interface Props {
    title: string;
    tasks: TaskPage[];
    modal: boolean;
    setModal: (value: boolean) => void;
    propOrd: DateProp;
    withotTime?: boolean;
    notDay?: boolean;
}


export const CalendarTasksModal = ({ title, tasks, modal, setModal, propOrd, withotTime, notDay }: Props) => {
    return (
        <CenterModal condition={modal} setCondition={setModal} >
            <div className="h-96 flex flex-col p-6 items-start gap-5 justify-start w-full">
                <h5 className="text-h4 font-alata ">
                    {title}
                </h5>
                <div className="h-64 w-full items-center justify-center overflow-y-auto flex-wrap gap-1 flex">
                    <If condition={(propOrd.includesHours && !withotTime)}>

                        <div className="h-min w-full flex-col items-start justify-between overflow-auto flex">
                            {
                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((h) => {
                                    return (
                                        <div className="w-full flex justify-evenly flex-col" key={h}>
                                            <div className="w-full items-center flex gap-4">
                                                <span className="flex items-center font-alata text-p w-min whitespace-nowrap">
                                                    {h < 10 ? "0" + h : h}:00 - {h < 10 ? "0" + h : h}:59
                                                </span>
                                                <Scrollable>
                                                    <div className="flex h-12 w-96   items-center gap-1 " >
                                                        {
                                                            tasks.filter(t => new Date(
                                                                new Date(t.task.properties.find(p => p.property.id === propOrd.id)?.value.value?.dateTime)
                                                            ).getHours() == h).map((t) => (
                                                                <TaskTagCalendar t={t} key={t.task.id} closeModal={setModal} />
                                                            ))
                                                        }
                                                    </div>
                                                </Scrollable>
                                            </div>
                                            <div className="w-full h-px rounded-full bg-input-grey dark:opacity-25" />
                                        </div>
                                    )
                                })
                            }
                        </div>                        
                        <div className="h-64 w-full items-center justify-center overflow-y-auto none-scrollbar flex-wrap gap-1 flex">
                            {
                                tasks.length > 0 ?
                                    tasks.map((t) => (
                                        <TaskTagCalendar t={t} key={t.task.id} closeModal={setModal} />
                                    ))
                                    :
                                    <p className="font-montserrat text-h5 text-center w-full opacity-50">Não há tarefas {notDay ? "sem data cadastradas...":"nesse dia..."}</p>
                            }
                        </div>
                    </If>
                </div>
            </div>
        </CenterModal>
    )
}