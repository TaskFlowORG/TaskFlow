interface Props {
    text: string
}

export const CardText = ({ text }: Props) => {
    return (
        <p className="p w-full dark:text-white text-[#797979]">{text}</p>
    )
}