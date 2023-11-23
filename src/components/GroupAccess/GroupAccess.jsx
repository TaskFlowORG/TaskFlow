import React, { useState } from 'react';

export const GroupAccess = ({ nome, descricao }) => {
    const [checkboxOne, setCheckboxOne] = useState(false);
    const [checkboxTwo, setCheckboxTwo] = useState(false);
    const [checkboxThree, setCheckboxThree] = useState(false);

    const handleCheckboxChange = (checkboxName) => {
        switch (checkboxName) {
            case "one":
                setCheckboxOne(!checkboxOne);
                break;
            case "two":
                setCheckboxTwo(!checkboxTwo);
                break;
            case "three":
                setCheckboxThree(!checkboxThree);
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex gap-4 items-start">
            <img className="py-4" src="/img/EllipseTest.svg" />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h3 className="pAlata ">{nome}</h3>
                    <p className="mn whitespace-pre-wrap w-[403px] text-[#333]">{descricao}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <input type="checkbox" name="three" id="three" />
                        {/* <input type="checkbox" name="one" id="one" checked={checkboxOne} onChange={() => handleCheckboxChange("one")}/> */}
                        <label className="pAlata" htmlFor="one">Adicionar</label>
                    </div>
                    <div className="flex gap-4">
                        <input type="checkbox" name="three" id="three" />
                        <label className="pAlata" htmlFor="two">Editar</label>
                    </div>
                    <div className="flex gap-4">
                        <input type="checkbox" name="three" id="three" />
                        <label className="pAlata" htmlFor="three">Remover</label>
                    </div>
                </div>
            </div>
        </div>
    )
}