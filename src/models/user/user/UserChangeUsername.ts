
export class UserChangeUsername {

    constructor(
        public username: string,
        ) {}
    
   
    equals = (obj: any) => {
        return obj instanceof UserChangeUsername && obj.username === this.username;
    }
}
