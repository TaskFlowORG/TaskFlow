export const Chats = () => {
    return (
        <div className="w-full h-28 bg-white border rounded flex">
            <div className="w-full h-full grid grid-cols-3 " style={{ gridTemplateColumns: "20% 55% 25%" }}>
                <div className="flex items-center pl-2">
                    <div className=" col-start-1 col-end-2 w-14 h-14 bg-back-grey rounded-full ">
                        
                    </div>
                </div>
                <div className=" col-start-2 col-end-3 flex flex-col justify-center items-start">
                    <div >
                        <h5 className="h5">Fabrício Stefano</h5>
                    </div>
                    <div >
                        <p className="p">Preciso para hoje!</p>
                    </div>
                </div>
                <div className=" col-start-3 flex flex-col items-end justify-center px-2">
                    <div>
                        <h5 className="h5">08:45 AM</h5>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10  bg-[url('/img/not1.svg')] ">
                        <p className="p text-white">2</p>
                    </div>
                </div>
            </div>
        </div>
    )
}