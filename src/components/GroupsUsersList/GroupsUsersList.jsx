"use client"
import { useEffect, useState } from "react"

export const GroupsUsersList = () => {
    return (
        <div>
            <div className="flex flex-col gap-6">
                <div className="border rounded-md border-[#F04A94] bg-[#FCFCFC] h-12 flex gap-4">
                    <img className="ms-4" src="/img/User.svg" />
                    <p className="my-3">{name}</p>
                    <div className="text-[#F04A94] flex gap-7 my-2">
                        <p className="">|</p>
                        <p>Permission</p>
                    </div>
                </div>
            </div>
        </div>
    )
}