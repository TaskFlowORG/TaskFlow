import React, { useState } from 'react';
import { useTheme } from "next-themes";

export const GroupAccess = ({ name, description }) => {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex gap-4 items-start">
            <img className="py-4" src="/img/EllipseTest.svg" />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h3 className="pAlata ">{name}</h3>
                    <p className="mn whitespace-pre-wrap w-[403px] text-[#333]  dark:invert">{description}</p>
                </div>
                <div className="flex justify-end">
                    <select className='selectGroup pAlata border-[#F04A94]' name="permissão" id="permissão">
                        <option value="" disabled selected>Permissão</option>
                        <option value="adicionar">Adicionar</option>
                        <option value="remover">Remover</option>
                        <option value="editar">Editar</option>
                    </select>
                </div>
            </div>
        </div>
    )
}