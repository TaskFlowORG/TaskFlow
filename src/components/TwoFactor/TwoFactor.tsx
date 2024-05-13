import { Code } from "@/models/Code"
import { emailService } from "@/services/services/EmailService"
import { useEffect, useState } from "react"

export const TwoFactor = () =>{
    const [number1, setNumber1] = useState<string>("");
    const [number2, setNumber2] = useState<string>("");
    const [number3, setNumber3] = useState<string>("");

    const [code, setCode] = useState<Code[]>();
    const [email, setEmail] = useState<string>("")

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

    return(
        <div className="flex h-5/6 w-screen absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
        <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-9">
        <h4 className="h4 leading-6 w-80 flex py-2 md:py-0 text-center">Selecione o código enviado em seu email</h4>
        <span className="text-red-500 text-sm">errou</span>

        <div className='gap-2 w-4/5 pt-10 flex flex-col items-center justify-center'>

        </div>
        </div>
        </div>
        
    )
}