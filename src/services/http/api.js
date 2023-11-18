import { useEffect, useState } from 'react';
import axios from 'axios';

const UserData = () => {

    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);
    const [address, setAddress] = useState([]);
    const [picture, setPicture] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [description, setDescription] = useState([]);


    const getData = async () => {
        try {

            //alterar o id para o id do usuario logado futuramente

            const res = await axios.get('http://localhost:9999/user/3');
            const info = res.data;
            setName(info.name);
            setSurname(info.surname);
            setAddress(info.address);
            setPicture(info.picture);
            setEmail(info.email);
            setPhone(info.phone);
            setDescription(info.description);

            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);
    return { name, surname, address, picture, email, phone, description };
}

export default UserData;
