import { UserLogin } from "@/models/user/user/UserLogin";
import {Api} from "../axios";

class Authentication {

    async login(user : UserLogin):Promise<void> {
        await Api.post("login", user);
    }

}

export const authentication = new Authentication();