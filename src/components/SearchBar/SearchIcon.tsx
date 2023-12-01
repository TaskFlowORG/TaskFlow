interface Props {
    iconSrc: string,
    action: () => any
}

export const SearchIcon = ({ iconSrc, action }: Props) => {
    return (
        <span className="w-12 h-12 flex justify-center rounded-full dark:bg-secondary cursor-pointer items-center bg-primary" onClick={() => action()}> <img src={iconSrc} alt="dd " /></span>
    )
}