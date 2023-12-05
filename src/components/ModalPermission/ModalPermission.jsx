import { getData, getListData } from "@/services/http/api";
import { useEffect, useState } from "react"

export const ModalPermission = ({ id }) => {
    const [change, setChange] = useState('')
    const [user, setUser] = useState({});
    const [groupUsers, setGroupUser] = useState([]);

    useEffect(() => {
        const getListGroup = async () => {
            const fetchedGroupUsers = await getListData("user-group");
            setGroupUser(fetchedGroupUsers);
        }
        getListGroup();

        groupUsers.map(u => {
            if (u.userId == id) {
                setUser(u)
            }
        })
    })
    return (

        <div className="bg-[#F2F2F2] flex flex-col top-0 right-[-130px] absolute ">
            <div className=" justify-between">
                <div className="flex gap-4">
                    <input type="checkbox" name="one" id="one" />
                    <label className="pAlata" htmlFor="one">Adicionar</label>
                </div>
                <div className="flex gap-4">
                    <input type="checkbox" name="two" id="two" />
                    <label className="pAlata" htmlFor="two">Remover</label>
                </div>
                <div className="flex gap-4">
                    <input type="checkbox" name="three" id="three" />
                    <label className="pAlata" htmlFor="three">Editar</label>
                </div>
            </div>
        </div>

    )
}