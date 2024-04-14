import { UserContext } from "@/contexts/UserContext";
import { Language } from "@/models";
import { userService } from "@/services";
import { useContext } from "react";

interface Props {
    title: string;
    description: string;
    options: string[];
}

export const InputSelectConfig = ({ title, description, options }: Props) => {

    const { user, setUser } = useContext(UserContext);

    const changeLanguage = async (value: string) => {
        if (!setUser || !user) return;
        user.configuration.language = Language[value.toUpperCase() as keyof typeof Language];
        const updatedUser = await userService.patch(user)
        setUser(updatedUser);
        console.log(value);
    }

    return (
        <div className="pt-10">
            <div className="flex justify-between">
                <p className="text-h4 font-alata">{title}</p>
                <div className="flex items-center font-bold">
                    <div className="h-min w-fit relative">
                        <select className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary dark:border-secondary rounded-sm text-primary dark:text-secondary text-center lg:w-full pr-[7vh]">
                            {options.map((option, index) => (
                                <option key={index} value={option} onChange={changeLanguage(option)}>{option}</option>
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