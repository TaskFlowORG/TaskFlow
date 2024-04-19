import { Language, User } from "@/models";
import { userService } from "@/services";

interface Props {
    id: string
    title: string;
    description: string;
    options: {id:string, value:string}[];
    func: (value: string) => void;
    defaultValue: string
}


export const InputSelectConfig = ({ id, title, description, options, func, defaultValue }: Props) => {

    const change = (value: string) => {
        let language: Language;
        let dataProperty: string;
        if (id == "language") {
            switch (value) {
                case "Português":
                    language = Language.PORTUGUESE;
                    break
                case "Español":
                    language = Language.SPANISH;
                    break
                default:
                    language = Language.ENGLISH;
            }
            return language;
        } else {
            if (value == "Agendamento") {
                dataProperty = "scheduling";
            } else {
                dataProperty = "deadLine";
            }
            return dataProperty;
        }
    }

    return (
        <div className="pt-10">
            <div className="flex justify-between">
                <p className="text-h4 font-alata">{title}</p>
                <div className="flex items-center font-bold">
                    <div className="h-min w-fit relative">
                        <select id={id} onChange={(e) => func(change(e.target.value))} defaultValue={defaultValue} className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary dark:border-secondary rounded-sm text-primary dark:text-secondary text-center lg:w-full pr-[7vh]">
                            {options.map((option, index) => (
                                <option key={index} value={option.id}>{option.value}</option>
                            ))}
                        </select>
                        <div className=" border-l-[2px] border-primary dark:border-secondary -z-[10] lg:w-16 w-10 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary dark:text-secondary font-mono ">
                            <span className=" rotate-90">{">"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-p font-alata">
                    {description}
                </p>
            </div>
        </div>
    )
}