import { RangeInput } from "@/components/RangeInput";
import { User } from "@/models";
import { useContext, useEffect, useState } from "react";
import { userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { set } from "zod";

export const InputRangeConfig = () => {
    const {user, setUser} = useContext(UserContext);
    const [range, setRange] = useState<number>(user?.configuration.fontSize ?? 16);
    const updateBack = async () => {
        if (!user || !setUser) return;
        user.configuration.fontSize = range;
        const userUpdated = await userService.patch(user);
        setUser(userUpdated);
    };

    useEffect(() => {
        setRange(user?.configuration.fontSize ?? 16);
    }, [user]);



    useEffect(() => {
        document.documentElement.style.setProperty('--font-size-h1', `${3.5 * range}px`);
        document.documentElement.style.setProperty('--font-size-h2', `${3 * range}px`);
        document.documentElement.style.setProperty('--font-size-h3', `${2 * range}px`);
        document.documentElement.style.setProperty('--font-size-h4', `${1.5 * range}px`);
        document.documentElement.style.setProperty('--font-size-h5', `${1.25 * range}px`);
        document.documentElement.style.setProperty('--font-size-p', `${range}px`);
        document.documentElement.style.setProperty('--font-size-mn', `${0.875 * range}px`);
        document.documentElement.style.setProperty('--font-size-mnAlata', `${0.75 * range}px`);
      }, [range]);


    return (
        <div className="pt-10">
            <div className="flex justify-between w-full">
                <p className="text-h4 font-alata">Tamanho da fonte</p>
                <div onMouseUp={updateBack} className="w-44">
                    <div className="flex justify-center">
                        <p className="text-p font-alata">{range}</p>
                    </div>
                    <RangeInput
                        step={2}
                        min={12}
                        max={18}
                        range={range}
                        setRange={(newValue) => { setRange(newValue ? +newValue : range), console.log(newValue) }}
                    />
                </div>
            </div>
            <div>
                <p className="text-p font-alata">Escolha o tamanho da fonte que você quer usar no site!</p>
            </div>
        </div>
    );
};
