"use client"
import { getData } from "@/services/http/api";
import { useEffect, useState } from "react"


export const GroupUsersList = ({ userId }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await getData("user", userId);
            setUser(fetchedUser)
        }
        console.log(userId)
        getUser();
    }, []);

    return (
        <div>
            <div className="">
                <div className="border rounded-md border-[#F04A94] px-4 pr-6 bg-[#FCFCFC] h-12 flex items-center justify-between">
                    <div className="flex gap-6">
                        <img className="" src="/img/User.svg" />
                        <p className="whitespace-nowrap">{user.name}</p>
                    </div>
                    <div className="text-[#F04A94] flex gap-7  ">
                        <p className="">|</p>
                        <p>Permission</p>
                    </div>
                </div>
            </div>
        </div>
    );
};