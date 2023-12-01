
import { Tag } from "./Tag"

interface Props {
    tags: any[]
}

export const CardTag = ({ tags }: Props) => {
    console.log(tags)
    return (
        <>
            <div className="oi w-full overflow-clip  flex gap-2 relative">
                {/* Código svg do gradiente para "mostrar ao usuário que é scrollavel" */}
                {/* <img src="gradient.svg" className="absolute h-full left-[-0.1rem]" alt="" /> */}
                {
                    tags.map(tag => {
                        return <Tag value={tag.value} />
                    })
                }
            </div>

        </>
    )
}