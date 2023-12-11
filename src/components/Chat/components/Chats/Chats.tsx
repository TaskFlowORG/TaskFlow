interface Props{
    name: string,
    lastMessage: string,
    quantitityUnvisualized: number
}


export const Chats = ({name, lastMessage , quantitityUnvisualized }:Props) => {

    return (
        <div className="w-full h-28 bg-white border rounded flex shadow-blur-10 my-1">
            <div className="w-full h-full grid grid-cols-3 " style={{ gridTemplateColumns: "20% 55% 25%" }}>
                <div className="flex items-center pl-2">
                    <div className=" col-start-1 col-end-2 w-14 h-14 bg-back-grey rounded-full border-primary border-2">
                        
                    </div>  
                </div>
                <div className=" col-start-2 col-end-3 flex flex-col justify-center items-start">
                    <div >
                        <h5 className="h5">{name}</h5>
                    </div>
                    <div >
                        <p className="p">{lastMessage}</p>
                    </div>
                </div>
                <div className=" col-start-3 flex flex-col items-end justify-center px-2">
                    <div>
                        <h5 className="p">08:45 AM</h5>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                        <p className="p text-white">{quantitityUnvisualized}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}