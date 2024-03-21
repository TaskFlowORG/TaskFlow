import { Login } from "@/components/Login";


export default function Home() {

      return (
        <div className="w-full h-full ">
            <div className="fixed z-[-1] bottom-0 right-0 hidden md:flex">
                <img src="/img/themeLight/Login.png"/>
            </div>
            <div className="flex fixed z-50 top-1 md:left-1/2 hidden md:flex">
                <img src="/img/MiddleRegister.png"/>
            </div>
            <div className="flex fixed md:hidden">
                <img src="/img/themeLight/RegisterPhone.png"/>
            </div>
            <div>
                <img className="fixed z-[-1] bottom-0 left-0 hidden lg:flex" src="/img/themeLight/SideLogin.png" />
            </div>
            <div className="flex w-full h-full">
                <Login/>
            </div>
        </div>
    )
}
