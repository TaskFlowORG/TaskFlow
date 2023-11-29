
export default function Loading() {
    return (


            <div className="w-screen h-screen flex justify-center items-center">
            <video loop width={200} className=" animate-pulse" autoPlay muted>
                <source src="Assets/WhiteLoad.mp4" type="video/mp4" />
            </video>

            </div>
    )


}