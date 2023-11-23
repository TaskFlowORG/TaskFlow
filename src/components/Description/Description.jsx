"use client"
import { useEffect, useState } from "react"
import { GroupAccess } from "../GroupAccess/GroupAccess"

export const Description = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        setGroups([
            {
                nome: "Nome do Grupo",
                id: 1,
                descricao: "Lorem ipsum dolor sit amet consectetur. Ullamcorper volutpat dictum mauris orci enim aliquam. Volutpat fermentum nam vel id purus sit faucibus dolor. Blandit platea est sed risus cursus sagittis. Vitae odio auctor amet a eget."
            }

        ])
    }, [])

    return (
        <div className="flex gap-4 h-max pr-12">
            {
                groups && groups.map(g => (
                    <GroupAccess key={g.id} nome={g.nome} descricao={g.descricao} />
                ))
            }

        </div>
    )
}