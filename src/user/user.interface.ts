export interface UserData {
    username: string;
    password?: string;
    email: string;
    token?: string;
    bio: string;
    image?: string;
}


export interface UserRO {
    user: UserData;
}