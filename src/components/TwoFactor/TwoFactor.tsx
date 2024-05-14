import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Code } from "@/models/Code";
import { useRouter } from "next/navigation";
import { emailService } from "@/services/services/EmailService";

export const TwoFactor = () => {
    const router = useRouter();
    const [code, setCode] = useState<Code[]>();
    const [numberC, setNumberC] = useState<string>("");
    const [number, setNumber] = useState<string>();
    const [username, setUsername] = useState<string>("")
    const [error, setError] = useState<string>("")
    const { theme } = useTheme();

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const fetchedCode = await emailService.getCode();
        if (fetchedCode.length > 0) {
            const randomCode = fetchedCode[0].code;
            const userCode = fetchedCode[0].username;
            setUsername(userCode);
            setNumberC(randomCode);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(event.target.value);
    };

    const handleSubmit = () => {
        if (number !== null && number?.toString() === numberC) {
            // router.push("/" + username)
            router.push("/register")
        } else {
            setError("Código inválido!");
        }
    };

    return (
        <div className="flex h-full w-full absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
            <div className="h-full w-full shadow-blur-10 rounded-md bg-white dark:bg-modal-grey flex flex-col justify-center items-center">
                <h4 className="h4 leading-6 flex py-3 md:py-0">Verificação de duas etapas!</h4>
                <h4 className="p leading-6 flex py-3 md:py-1">Informe o código enviado em seu email</h4>
                <span className="text-red-500 text-sm">{error ?? ""}</span>


                <div className="flex items-center flex-col h-3/5 w-full justify-between">
                <div className="w-4/5 flex flex-col items-center justify-between py-14">
                        <input
                            type="text"
                            className="inputRegister pl-6"
                            placeholder="C - Digite seu código"
                            value={number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-end w-4/5 pt-8 md:pt-0'>
                        <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"} onClick={handleSubmit}>
                            Confirmar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
