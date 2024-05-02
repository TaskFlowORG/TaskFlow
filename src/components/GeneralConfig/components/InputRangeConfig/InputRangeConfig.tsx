import { RangeInput } from "@/components/RangeInput";
import { useContext, useEffect, useState } from "react";
import { userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";

interface Props{
    title: string
    description: string
}
export const InputRangeConfig = ({title, description}:Props) => {
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






    return (
        <div className="pt-10">
            <div className="flex justify-between w-full">
                <p className="text-h4 font-alata">{title}</p>
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
                <p className="text-p font-alata">{description}</p>
            </div>
        </div>
    );
};
