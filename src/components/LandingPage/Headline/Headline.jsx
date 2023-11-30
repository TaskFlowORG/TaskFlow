import { Button } from "../../Button"

export const Headline = () => {
  return (
    <div className={`flex flex-col lg:w-1/2 1.5xl:w-1/3 p-4 md:p-6 gap-6 relative `}>
      <h1 className="text-primary dark:text-white h2 lg:text-[56px] whitespace-nowrap">Headline Here</h1>
      <p className="md:text-[16px]  mn whitespace-normal">Lorem ipsum dolor sit amet consectetur. Quis purus ullamcorper facilisis molestie dignissim viverra elementum nunc eros. Fermentum neque justo ut elementum. Sit erat vulputate ac aliquet enim cras. Diam aliquam massa aliquam arcu suspendisse lorem odio velit suscipit. Velit nec habitant enim blandit nec vitae at convallis sed. Augue commodo etiam ultrices urna at urna. </p>
      <Button width={"w-min"} padding={"px-6"} other={"md:text-[16px] md:px-12 lg:text-[20px] dark:bg-secondary"} textSize={"text-[14px]"} />
    </div>
  )
}