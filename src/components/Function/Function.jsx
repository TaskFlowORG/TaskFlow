export const Function = ({bg, text, size}) => {
    return (
        <div className="shadowww justify-center  flex gap-6 p-6 w-1/2 py-16 rounded-2xl h-max">
            <div className="flex items-center relative">

                <div className="left-0 z-10 w-32 flex self-center h-32 shadowww bg-white rounded-full"> </div>
                <div className="absolute w-full flex items-center justify-center">
                    <div className={`absolute  -z-10 w-2 ${size} ${bg}`}>

                    </div>
                </div>
            </div>

            <div className="flex flex-col w-4/5 gap-7">
                <h3 className={`h3 ${text}`}>IA treinada para te oferecer o melhor</h3>
                <p className="p w-full">Lorem ipsum dolor sit amet consectetur. Urna egestas nisi commodo faucibus quam fermentum luctus faucibus elementum. Egestas mauris viverra libero gravida id a. Adipiscing molestie ut tincidunt hendrerit. Posuere dignissim eu natoque eget facilisis aliquam sit porta. Ultrices mattis vitae aliquam libero tempor fermentum vel.</p>
            </div>
        </div>
    )
}