import { Permission, User, UserPost, UserPut, UserWithoutPermission } from "@/models";
import { Api } from "../axios";

class UserService {

    async insert(user:UserPost):Promise<void>{
        await Api.post("user", user);
    }

    async getPermisisonInAProject(username:string, projectId:number):Promise<Permission>{
        return (await Api.get<Permission>(`user/${username}/${projectId}`)).data;
    }

    async update(user:User):Promise<void>{
        const userPut = new UserPut(user.username, user.name, user.surname,user.address ?? "", user.mail, user.phone ?? "", user.description ?? "", user.configuration, user.permissions);
        await Api.put("user", userPut);
    }

    async patch(user:User):Promise<void>{
        const userPut = new UserPut(user.username, user.name, user.surname, user.address ?? "", user.mail, user.phone ?? "", user.description ?? "", user.configuration, user.permissions);
        await Api.patch("user", userPut);
    }

    async findByUsername(username:string):Promise<User>{
        return (await Api.get<User>(`user/${username}`)).data;
    }

    async findByUsernameAndPassword(username:string, password:string):Promise<User>{
        return (await Api.get<User>(`user/username/${username}/${password}`)).data;
    }

    async findByEmailAndPassword(email:string, password:string):Promise<User>{
        return (await Api.get<User>(`user/email/${email}/${password}`)).data;
    }

    async upDatePicture(picture:File, username:string):Promise<void>{
        const formData = new FormData();
        formData.append('picture', picture);
        await Api.patch(`user/picture/${username}`, formData);
    }

    async upDatePassword( username:string,  password:string):Promise<void> {
        await Api.patch(`user/password/${username}`, password);
    }


    async findAll():Promise<User[]>{
        return (await Api.get<User[]>(`user`)).data;
    }

    async delete(username:string):Promise<void>{
        await Api.delete(`user/${username}`);
        //Ao deletar um usuario ele tem que setar o novo owner de seus projetos
    }

    async findByUsersNameOrName(name:string):Promise<User[]>{
        return (await Api.get<User[]>(`user/name/${name}`)).data;
    }

    //TODO:Requisição que atualiza a senha dele
}

export const userService = new UserService();