import Image from "next/image";

export const Footer = () => {

    const theme: string = "light";
    return (
        <div className="h-[500px] w-full bg-primary dark:bg-secondary flex justify-center flex-col items-center">

            <div className="h-1/2 w-4/5 lg:w-3/5 flex justify-between border-b-2" >
                <div className="flex flex-col justify-center w-1/3">
                    <span className="h-[80px] lg:h-[128px] md:h-[100px] lg:w-[121px] md:w-[98px] w-[78px] relative">

                    <Image fill src="/Assets/logo/iconDark.svg" alt="logo"  />
                    </span>
                    <p className=" font-alata h5 text-white">A organização que te liberta! </p>
                </div>

                <div className="flex flex-col justify-start w-[60%] lg:w-[38%] ">
                    <div className=" h-1/2 flex justify-between font-alata text-white items-center  ">
                        <p>Sobre nós</p>
                        <p>Sobre nós</p>
                        <p>Sobre nós</p>
                    </div>
                </div>
            </div>

            <div className="h-1/2 w-full flex flex-col justify-center items-center">
                <div className="h-4/5 w-2/4 md:w-2/4 lg:w-[30%] flex items-center justify-between">
                    <div className=" h-[48px] lg:h-[65px] md:h-[55px] w-[48px] lg:w-[65px] md:w-[55px] rounded-full border-2 flex items-center justify-center">
                        <span className="h-[28px] lg:h-[48px] md:h-[32px] w-[28px] lg:w-[48px] md:w-[32px] relative">

                        <Image src="./Assets/iconsSocial/Instagram.svg" alt="Instagram" fill />
                        </span>
                    </div>

                    <div className="h-[48px] lg:h-[65px] md:h-[55px] w-[48px] lg:w-[65px] md:w-[55px] rounded-full border-2 flex items-center justify-center">
                        <span  className="h-[28px] lg:h-[48px] md:h-[32px] w-[28px] lg:w-[48px] md:w-[32px] relative">

                        <Image fill src="./Assets/iconsSocial/iconTwitter.svg" alt="Twitter" />
                        </span>
                    </div>

                    <div className="h-[48px] lg:h-[65px] md:h-[55px] w-[48px] lg:w-[65px] md:w-[55px] rounded-full border-2 flex items-center justify-center">
                        <span  className="h-[28px] lg:h-[48px] md:h-[32px] w-[28px] lg:w-[48px] md:w-[32px] relative">

                        <Image fill src="./Assets/iconsSocial/Link.svg" alt="Linkedin" />
                        </span>
                    </div>

                    <div className="h-[48px] lg:h-[65px] md:h-[55px] w-[48px] lg:w-[65px] md:w-[55px] rounded-full border-2 flex items-center justify-center">
                        <span  className="h-[28px] lg:h-[48px] md:h-[32px] w-[28px] lg:w-[48px] md:w-[32px] relative">

                        <Image fill src="./Assets/iconsSocial/iconFacebook.svg" alt="Facebook" />
                        </span>
                    </div>
                </div>
                <div className="h-1/5 w-full bg-white dark:bg-back-grey flex justify-center items-center">
                    <p className="font-alata text-primary dark:text-white">© TaskFlow. Todos os direitos reservados</p>

                </div>
            </div>
        </div>

    )
}

