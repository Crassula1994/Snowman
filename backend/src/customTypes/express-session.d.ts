import "express-session";

declare module "express-session" {
    interface SessionData {
        user: {
            userId: string;
            userName: string;
            email: string;
            recordNo: string;
        };
        userLog?: [
            {
                logType: string;
                logCreatedAt: string;
                address: string;
            }
        ];
    }
}
