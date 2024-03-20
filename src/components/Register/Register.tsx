import { Form } from "react-hook-form"
import { Input } from "@/components/Input";

export const Register = ({ }) => {
    

    return (
        <div className="flex h-5/6 w-screen absolute justify-center items-center">
            <div className="flex items-center flex-col h-1/2 w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey  justify-between py-8">
                <h4 className="h4">Registrar</h4>
                <div>
                    <form>
                        // onSubmit={handleSubmit(handleRegister)}
                        
                    
                        <p className="h4">Registrar</p>

                        {value === 0 && (
                            <>
                                <Input
                                    className="inputRegister"
                                    image={"Assets/themelight/IconUser.svg"}
                                    placeholder="Digite seu nome"
                                    value={user.name}
                                    helperText={"errors.name?.message"}
                                    register={ "...register(name) "}
                                    required
                                    classNameInput={
                                        "w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"
                                    }
                                />
                            </form>
                            </div>
                            </div>
                    </div>
            )
}