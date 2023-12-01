interface Props {
    radio: string
}
export const Radio = ({ radio }: Props) => {

    return (
        <div className="s-input flex gap-1">
            <input type="radio" id="radio1" />
            <label className="w-max" htmlFor="radio1">{radio}</label>
        </div>
    )
}