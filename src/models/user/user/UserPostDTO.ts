import { UserDetails } from "./UserDetails";

export class UserPost {

    constructor(
        public userDetailsEntity: UserDetails,    
        public name: string,
        public surname: string,
        public mail: string,
    ) {}
    
    equals = (obj: any) => {
        return obj instanceof UserPost && obj.userDetailsEntity.username === this.userDetailsEntity.username;
    }
}
