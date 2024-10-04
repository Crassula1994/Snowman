export interface UserType {
    userId: string;
    userName: string;
    email: string;
    password?: string;
    signInLog?: [
        {
            date: string;
            type: string;
            address: string;
        }
    ];
}
