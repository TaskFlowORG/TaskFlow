export const TutorialConfig = () => {
    return (
        <>
            <div className="h-40 w-full flex items-start justify-between pt-6">
                <div className="w-[65%] flex  flex-col">
                    <p className="h3 dark:text-white ">Tutorial </p>
                    <p className="p">Compreenda perfeitamente todas as funcionalidades dentro do nosso aplicativo!</p>
                </div>
                <div className="w-fit h-full flex flex-col items-end justify-around">
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer">
                        <p className="p text-white ">Refazer Tutorial</p>
                    </div>
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer">
                        <p className="p text-white ">Tutorial Avançado</p>
                    </div>
                </div>
            </div>
            </>
    )
}