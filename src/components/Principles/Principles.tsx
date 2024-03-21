import Image from 'next/image';
import { FlippableCard } from './FlippableCard';

export const Principles = () => {
    return (
        <div className="flex flex-col items-center gap-[5rem] mb-12">
            <h2 className="h3 md:text-[48px] text-primary dark:text-white self-center">Princípios</h2>

            <div id="cocotinha" className="flex flex-wrap gap-12 md:gap-1 justify-between  w-full relative max-w-[957px]">
                <Image width={170} height={190} src="prank.svg" alt="" className="absolute z-[1] bottom-[-105px] left-[-48px]" />
                <Image width={170} height={190} src="prank.svg" alt="" className="absolute z-[1] top-[-55px] rotate-180 right-[-30px]" />
                <FlippableCard title={"Missão"} content={"Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et."} img={"missao.png"} />
                <FlippableCard title={"Visão"} content={"Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et."} img={"missao.png"} />
                <FlippableCard title={"Valores"} content={"Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et."} img={"missao.png"} />

            </div>
        </div>
    )
}