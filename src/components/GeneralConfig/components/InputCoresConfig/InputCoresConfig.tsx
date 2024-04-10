import { Obj } from "@/components/Obj";

interface Props {
    functionBall: (value: Object) => void;
}

export const InputCoresConfig = ({ functionBall }: Props) => {
    return (
        <div className="pt-6">
            <div className="flex justify-between">
                <p className="h4">Cores</p>
                <div className="relative">
                    <Obj
                        objs={["#f04a94", "#f76858", "#A763DD", "#72BF7E", "#7FAEF5", "+"]}
                        mawWidth="w-max"
                        max={2}
                        functionObj={functionBall}
                        color
                        isString
                    />
                </div>
            </div>
            <div>
                <p className="p">Escolha sua cor principal, nós geraremos uma cor secundária para você!</p>
            </div>
        </div>
    )
}