export interface UserType {
    userId: string;
    username: string;
    email: string;
    password: string;
    signInLog?: [
        {
            date: string;
            type: string;
            address: string;
        }
    ];
}
