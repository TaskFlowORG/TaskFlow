export const InputSelectConfig = () => {
    return (
        <div className="pt-10">
            <div className="flex justify-between">
                <p className="h4">Propriedade data</p>
                <div className="flex items-center font-bold">
                    <div className="h-min w-fit relative">
                        <select className="p appearance-none bg-transparent p-2 outline-none border-[2px] border-primary dark:border-secondary rounded-sm text-primary dark:text-secondary text-center lg:w-full pr-[7vh]">
                            <option
                                value="Selected"
                                key="1"
                                className="w-full "
                            >
                                Selected
                            </option>
                        </select>
                        <div className=" border-l-[2px] border-primary dark:border-secondary -z-[10] lg:w-16 w-10 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary dark:text-secondary font-mono ">
                            <span className=" rotate-90">{">"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="p">
                    Escolha por qual tipo de propriedade data você deseja ver
                    suas tarefas do dia na “Página Inicial”.
                </p>
            </div>
        </div>
    )
}