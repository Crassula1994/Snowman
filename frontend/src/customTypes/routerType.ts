import { UserType } from "./userType";

export interface LoginLoaderData {
    message: string;
    user: UserType;
    authenticated: boolean;
}
