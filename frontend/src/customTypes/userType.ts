export interface UserType {
    userId: string;
    userName: string;
    email: string;
    password?: string;
    signInLog?: LogType[];
}

export interface LogType {
    date: string;
    type: string;
    address: string;
}
