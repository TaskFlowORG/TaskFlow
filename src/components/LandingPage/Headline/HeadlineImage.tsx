import Image from "next/image";
export const HeadlineImage = () => {
  return (
    <div className="relative hidden lg:flex items-center justify-center gap-4 h-full ">
      {/* <div className="absolute 1.5xl:hidden rounded-2xl centeredAbsolute bg-orange-500 shadowwwsecondary w-[260px] overflow-clip h-[280px] ">
                <Image fill alt="" src={"/womanWorking.png"}></Image>
                    
                </div>
                <div className="absolute hidden rounded centeredAbsolute 1.5xl:flex justify-between gap-8 items-center  overflow-clip w-[500px] h-[335px] ">
                    <div className="w-full h-full bg-orange-500 rounded-xl shadowwwsecondary overflow-clip">
                    <Image width={300}  height={500} alt="" src={"/mulher.png"}></Image>
                    </div>
                    <div className="w-full h-full bg-orange-500 rounded-xl shadowwwsecondary overflow-clip">
                        <Image width={250}  height={200} alt="" src={"/working.png"}></Image>
                    </div>
                </div> */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[275px] 1.5xl:w-[400px] h-[500px]">
        <Image fill alt="" src="/undrawUse.svg"></Image>
      </div>


      <div className="z-[-1]  1.5xl:w-[550px] w-[400px]">
        <Image width="668" height="502" src={"landing.svg"} alt=""></Image>
      </div>
    </div>
  );
};
