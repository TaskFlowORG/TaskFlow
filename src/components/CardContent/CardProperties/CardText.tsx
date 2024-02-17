interface Props {
    text: string,
    property:string
}

export const CardText = ({ text, property }: Props) => {
    return (
        <p className="p w-full dark:text-white text-[#797979]">{property}: {text ? text : "Não descrito!"}</p>
    )
}