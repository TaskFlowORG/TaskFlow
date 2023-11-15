'use client';

import { CardDate } from "./CardProperties/CardDate"
import { CardProgress } from "@/components/CardContent/CardProperties/CardProgress"
import { CardTag } from "./CardProperties/CardTags"
import { CardRadios } from "./CardProperties/CardRadios"
import { CardText } from "./CardProperties/CardText"
import { useEffect, useState } from "react"

export const CardContent = ({ task }) => {

    const [properties, setProperties] = useState([])

    useEffect(() => {
        setProperties(task.properties)
        console.log(properties)
    }, [task])

    return (
        <>
            <div className="flex justify-between">
                <h4>{task.name}</h4>
                <div className="  flex items-center relative w-16">
                    <span className="w-8 h-8 rounded-full bg-pink absolute shadowww  right-8"></span>
                    <span className="w-8 h-8 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
                    <span className="w-8 h-8 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span>

                </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
            {
                properties.map((property) => {
                    console.log(property.property.type)
                    if (property.property.type == "text") {
                        return <CardText text={property.value} />
                    }
                })
            }
            {
                properties.map((property) => {
                    console.log(property.property.type)
                    if (property.property.type == "date") {

                        return <CardDate date={property.value} />
                    }
                })
            }
            <CardTag />
            <CardRadios />
            </div>


        </>
    )
}


