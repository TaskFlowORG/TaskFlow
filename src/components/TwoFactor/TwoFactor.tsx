import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Code } from "@/models/Code";
import { useRouter } from "next/navigation";
import { emailService } from "@/services/services/EmailService";

export const TwoFactor = () => {
    const router = useRouter();
    const [code, setCode] = useState<Code[]>();
    const [numberC, setNumberC] = useState<string>("");
    const [numbers, setNumbers] = useState<string[]>([]);
    const [username, setUsername] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
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
            initNumbers(randomCode); 
        }
    };
    

    const getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const initNumbers = (codeToShow: string) => {
        let randomNum1;
        do{
            randomNum1 = getRandomNumber(10, 99);
        } while(randomNum1.toString() === codeToShow);
        let randomNum2;
        do {
            randomNum2 = getRandomNumber(10, 99);
        } while (randomNum2 === randomNum1 && randomNum1.toString() === codeToShow);

        const listNumbers = [randomNum1.toString(), randomNum2.toString(), codeToShow].sort(() => Math.random() - 0.5);
        setNumbers(listNumbers);
    };

    const handleSelectNumber = (number:number) => {
        setSelectedNumber(number);
    };

    const verifyCode = () => {
        if (selectedNumber !== null && selectedNumber.toString() === numberC) {
        // router.push("/" + username)
        // router.push("/register")
    } else{
        setError("Código inválido!")
    }
    };

    return (
        <div className="flex h-5/6 w-screen absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
            <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-9 gap-2">
                <h4 className="h4 leading-6 w-80 flex py-2 md:py-0 text-center ">Selecione o código enviado em seu email</h4>
                <span className="text-red-500 text-sm">{error ?? ""}</span>

                <div className='w-4/6 flex flex-row items-center justify-between md:pb-8'>
                    {numbers.map((number, index) => (
                        <div key={index} className={`flex justify-center items-center bg-[#D9D9D9] dark:bg-[#383838] bg-opacity-30 w-20 h-20 rounded-full shadow-xl 
                            ${selectedNumber === Number(number) ? (theme === 'dark' ? 'border-2 border-secondary' : 'border-2 border-primary') : ''}`}
                            onClick={() => handleSelectNumber(Number(number))}
                        >
                            <button className="font-montserrat text-5xl text-center w-full h-full">
                                {number}
                            </button>
                        </div>
                    ))}
                </div>
                <div className='flex justify-end w-4/5 pt-8 md:pt-0'>
                    <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"} onClick={verifyCode}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
