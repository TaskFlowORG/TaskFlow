interface Props {
    iconSrc: string,
    action: () => any
    open: () => any
}

export const SearchIcon = ({ iconSrc, action, open }: Props) => {
    return (
        <span className="w-12 h-12 flex justify-center rounded-full dark:bg-secondary cursor-pointer items-center bg-primary" onClick={() => open()}> <img src={iconSrc} alt="ícon of searchbar  " /></span>
    )
}