"use client"
import { getData } from "@/services/http/api";
import { useEffect, useState } from "react"

import { ModalPermission } from "../ModalPermission"


export const GroupUsersList = ({ userId }) => {
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await getData("user", userId);
            setUser(fetchedUser)
        }
        getUser();
    }, []);


    const handleClick = () => {
        if (!showModal) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    };

    return (
        <div>
            <div className="">
                <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC]  dark:bg-[#3C3C3C] dark:border-[#F76858] h-12 flex items-center justify-between">
                    <div className="flex gap-6">
                        <img className="" src="/img/User.svg" />
                        <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black ">{user.name}</p>
                    </div>
                    <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-between ">
                        <p>|</p>
                        <p onClick={handleClick}>Permission</p>
                        {showModal && <ModalPermission id={userId} />}
                    </div>
                </div>
            </div>
        </div>
    );
};