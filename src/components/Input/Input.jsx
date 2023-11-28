'use client'


export const Input = (props) => {
    return (
        <>
            <div className="h-full w-full">
                {props.error != null && <p className="text-red-500">{props.error}</p>}
                <div className={props.theme == "dark" ? "inputDark" : "inputLight"}>

                    <input type={props.type} placeholder={props.placeholder} {...props} />

                </div>
            </div>
        </>
    )
}