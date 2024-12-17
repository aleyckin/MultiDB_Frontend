export class User{
    constructor(data) {
        this.id = data?.id;
        this.login = data?.login;
        this.password = data?.password;
    }
}