import { useTranslation } from "react-i18next"
import { Function } from "./Function"

export const Features = () => {
    const {t} = useTranslation()
    return (
        <div className="w-full flex items-center flex-col gap-[4.5rem] ">
            <h2 className="h3 w-min text-primary lg:text-[48px] dark:text-white text-center md:whitespace-nowrap">{t('our-features')}</h2>
            <div className="flex relative flex-col gap-8 md:gap-32 items-center max-w-[956px] w-full p-8 ">
                <div className="w-2 h-full md:hidden bg-primary absolute centeredAbsolute">

                </div>
                <Function title="Veja de diferentes formas!" content="Com o TaskFlow, você obtém uma plataforma completa para gerenciar suas tarefas, oferecendo diversas visualizações, incluindo Canvas, Timeline, Kanban e Calendário. Assim, você tem a flexibilidade de escolher a melhor abordagem para otimizar sua produtividade e organização."  text={"text-[#E41CEF]"} bg={"timeline__primaryToPurple"} size={"h-[400px]"} />
                <Function title="Veja de diferentes formas!" content="Com o TaskFlow, você obtém uma plataforma completa para gerenciar suas tarefas, oferecendo diversas visualizações, incluindo Canvas, Timeline, Kanban e Calendário. Assim, você tem a flexibilidade de escolher a melhor abordagem para otimizar sua produtividade e organização." text={"text-primary"} bg={"timeline__purpleTosecondary"} size={"h-[600px]"} />
                <Function title="Veja de diferentes formas!" content="Com o TaskFlow, você obtém uma plataforma completa para gerenciar suas tarefas, oferecendo diversas visualizações, incluindo Canvas, Timeline, Kanban e Calendário. Assim, você tem a flexibilidade de escolher a melhor abordagem para otimizar sua produtividade e organização." text={"text-secondary"} bg={"bg-secondary"} size={"h-[400px]"} />
            </div>
        </div>
    )
}