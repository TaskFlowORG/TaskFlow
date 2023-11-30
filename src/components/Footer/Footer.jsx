export const Footer =  () => {

           const theme = "light";
    return (
<>
        {theme === "light" &&  <div className="h-[500px] w-full bg-primary dark:bg-secondary flex justify-center flex-col items-center">
            
            <div className="h-1/2 w-3/5 flex justify-between border-b-2" >
                <div className="flex flex-col justify-center w-1/3">
                    <img src="/Assets/logo/iconDark.svg" alt="" className="h-[128px] w-[121px]" />
                    <p className=" font-alata h4 text-white">A organização que te liberta! </p>
                </div>

                <div className="flex flex-col justify-start w-1/3 ">
                <div className=" h-1/2 flex justify-between font-alata text-white items-center  ">
                    <p>Sobre nós</p>
                    <p>Sobre nós</p>
                    <p>Sobre nós</p>
                    </div>
                </div>
            </div>

            <div className="h-1/2 w-full flex flex-col justify-center items-center">
                <div className="h-4/5 w-1/4 flex items-center justify-between">
                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/Instagram.svg" alt="" className="h-[48px] w-[48px]" />
                    </div>

                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/iconTwitter.svg" alt="" className="h-[48px] w-[48px]"/>
                    </div>

                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/Link.svg" alt="" className="h-[48px] w-[48px]"/>
                    </div>

                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/iconFacebook.svg" alt="" className="h-[48px] w-[48px]" />
                    </div>
                </div>
                <div className="h-1/5 w-full bg-white dark:bg-back-grey flex justify-center items-center">
                    <p className="font-alata text-primary dark:text-white">© TaskFlow. Todos os direitos reservados</p>

                </div>
            </div>
        </div>}
       {theme === "dark" &&   <div className="h-[500px] w-full bg-secondary flex justify-center flex-col items-center">
            
            <div className="h-1/2 w-3/5 flex justify-between border-b-2" >
                <div className="flex flex-col justify-center w-1/3">
                    <img src="./Assets/icon.svg" alt="" className="h-[128px] w-[121px]" />
                    <p className=" font-alata h4 text-white">A organização que te liberta! </p>
                </div>

                <div className="flex flex-col justify-start w-1/3 ">
                <div className=" h-1/2 flex justify-between font-alata text-white items-center  ">
                    <p>Sobre nós</p>
                    <p>Sobre nós</p>
                    <p>Sobre nós</p>
                    </div>
                </div>
            </div>

            <div className="h-1/2 w-full flex flex-col justify-center items-center">
                <div className="h-4/5 w-1/4 flex items-center justify-between">
                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/Instagram.svg" alt="" className="h-[48px] w-[48px]" />
                    </div>

                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/iconTwitter.svg" alt="" className="h-[48px] w-[48px]"/>
                    </div>

                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/Link.svg" alt="" className="h-[48px] w-[48px]"/>
                    </div>

                    <div className="h-[65px] w-[65px] rounded-full border-2 flex items-center justify-center">
                        <img src="./Assets/iconsSocial/iconFacebook.svg" alt="" className="h-[48px] w-[48px]" />
                    </div>
                </div>
                <div className="h-1/5 w-full bg-back-grey flex justify-center items-center">
                    <p className="font-alata text-white">© TaskFlow. Todos os direitos reservados</p>

                </div>
            </div>
        </div>}
</>
    )
}

