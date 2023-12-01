"use client"
import { getData } from "@/services/http/api";
import { useEffect, useState } from "react"

import { ModalPermission } from "../ModalPermission"


export const GroupUsersList = ({ userId }) => {
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await getData("user", userId);
            setUser(fetchedUser)
        }
        getUser();
    }, []);

    return (
        <div>
            <div className="">
                <div className="border rounded-md border-[#F04A94] px-4 pr-6 bg-[#FCFCFC]  dark:bg-[#3C3C3C] h-12 flex items-center justify-between">
                    <div className="flex gap-6">
                        <img className="" src="/img/User.svg" />
                        <p className="whitespace-nowrap text-black ">{user.name}</p>
                    </div>
                    <div className="text-[#F04A94] flex gap-7  ">
                        <p className="">|</p>
                        <p onClick={handleClick}>Permission</p>
                        {showModal && <ModalPermission />}
                    </div>
                </div>
            </div>
        </div>
    );
};