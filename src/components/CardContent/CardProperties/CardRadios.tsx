import { Radio } from "./Radio"

interface Props {
    radios: any[]
}

export const CardRadios = ({ radios }: Props) => {
    return (
        <div className="oi w-full overflow-clip  flex gap-2 relative">
            {
                radios.map(radio => {
                    return <Radio radio={radio.value} />
                })
            }


        </div>

    )
}