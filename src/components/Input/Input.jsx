'use client'


export const Input = ({image, value, change, placeholder, type , ...props}) => {
    return (
        <>
            <div className="w-full flex justify-center items-center gap-2 shadow-blur-10 h-[62px] bg-white rounded-md font-montserrat focus-within:border-primary border-2 dark:focus-within:border-secondary duration-300 dark:bg-modal-grey dark:shadow-blur-20">
                    <img src={image} alt="" />
                    <input className="w-5/6 h-full outline-none  px-5 dark:bg-modal-grey" type={type} placeholder={placeholder} {...props} value={value}
                    onChange={
                        change
                    } />

               
            </div>
        </>
    )
}