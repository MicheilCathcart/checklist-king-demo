export interface User {
    email: string;
    name?: string;
    activeTeam: string;
    subscribed?: boolean;
    userCount?: number;
    stripeId?: string;
    teams?: {
        [key: string]: {
            name: string;
            role: string;
        }
    };
}
