import { FlippableCard } from './FlippableCard';

export const Principles = () => {
    return (
        <div className="flex flex-col items-center gap-[5rem]">
            <h2 className="h3 md:text-[48px] text-primary self-center">Princípios</h2>

            <div id="cocotinha" className="flex justify-between w-full relative max-w-[957px]">
                <img src="prank.svg" alt="" className="absolute z-[1] bottom-[-105px] left-[-48px]" />

                <img src="prank.svg" alt="" className="absolute z-[1] top-[-55px] rotate-180 right-[-30px]" />
                <FlippableCard title={"Missão"} content={"Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et."} img={"missao.png"} />
                <FlippableCard title={"Visão"} content={"Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et."} img={"missao.png"} />
                <FlippableCard title={"Valores"} content={"Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et."} img={"missao.png"} />

            </div>
        </div>
    )
}