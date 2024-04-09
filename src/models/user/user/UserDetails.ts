
export class UserDetails {

    constructor(
        public username: string,
        public password: string,
        ) {}
    
   
    equals = (obj: any) => {
        return obj instanceof UserDetails && obj.username === this.username;
    }
}
