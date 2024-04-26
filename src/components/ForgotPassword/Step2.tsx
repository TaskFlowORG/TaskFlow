
import { Code } from "@/models/Code";
import { emailService } from "@/services/services/EmailService";
import { useState, useEffect } from "react"
import { map } from "zod";

interface Props {
    setStep: (number: number) => void
}

export const Step2 = ({ setStep }: Props) => {
    const [number1, setNumber1] = useState<string>("");
    const [number2, setNumber2] = useState<string>("");
    const [number3, setNumber3] = useState<string>("");
    const [number4, setNumber4] = useState<string>("");
    const [code, setCode] = useState<Code[]>();
    const [email, setEmail] = useState<string>("")

    const handleChange = (value: string, setter: (value: string) => void) => {
        setter(value);
    };

    useEffect(() =>{
        fetchData()
    })

    
    const fetchData = async () =>{
        const fetchedCode = await emailService.getCode()
        setCode(fetchedCode);
        code?.map(c =>{
            setEmail(c.email)
        })
    }

    const verifyCode = async () => {
        const concatenatedNumber: string = (number1 + number2 + number3 + number4);

        console.log(concatenatedNumber);

        const code = await emailService.getCode();

        console.log(code);

        code.map(c => { 
            if (concatenatedNumber.toString() === c.code) {
                setStep(3);
            } else {
                alert("Código inválido, tente novamente!");
            }
        })
       
    }

    return (
        <>
            <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-9">
                <h4 className="h4 leading-6 w-60 flex py-2 md:py-0 text-center">Insira o código enviado em seu email</h4>
                <h3 className="font-alata flex pt-2">Para: {email}</h3>

                <div className='gap-5 h-4/5 w-4/5  flex items-center justify-center'>
                    <input
                        className="inputCode"
                        type="text"
                        value={number1}
                        onChange={(e) => handleChange(e.target.value, setNumber1)}
                        onKeyDown={(e) => {
                            if (e.key === " ") {
                                e.preventDefault();
                            }
                        }}
                    />
                    <input
                        className="inputCode"
                        type="text"
                        value={number2}
                        onChange={(e) => handleChange(e.target.value, setNumber2)}
                        onKeyDown={(e) => {
                            if (e.key === " ") {
                                e.preventDefault();
                            }
                        }}
                    />
                    <input
                        className="inputCode"
                        type="text"
                        value={number3}
                        onChange={(e) => handleChange(e.target.value, setNumber3)}
                        onKeyDown={(e) => {
                            if (e.key === " ") {
                                e.preventDefault(); 
                            }
                        }}
                    />
                    <input
                        className="inputCode"
                        type="text"
                        value={number4}
                        onChange={(e) => handleChange(e.target.value, setNumber4)}
                        onKeyDown={(e) => {
                            if (e.key === " ") {
                                e.preventDefault(); 
                            }
                        }}
                    />
                </div>

                <div className='flex justify-end w-4/5 pt-8 md:pt-0'>
                    <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"} onClick={verifyCode}>
                        Confirmar
                    </button>
                </div>
            </div>
        </>
    )

}