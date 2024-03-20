import { Register } from "@/components/Register";
import { Input } from "@/components/Input";

export default function Home() {

    
      return (
        <div className="w-full h-full ">
            <div className="fixed z-[-1] bottom-0 left-0">
                <img src="/img/Register.png" />
            </div>
            <div className="flex fixed z-50 top-1 left-1/2 "><img src="/img/MiddleRegister.png" />
            </div>
            <div>
                <img className="fixed z-[-1] bottom-0 right-0" src="/img/SideRegister.png" />
            </div>
            <div className="flex ">
                <Register/>
            </div>
        </div>
    )
}
