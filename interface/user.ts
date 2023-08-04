
export interface IUser {
    _id?     : string;
    usuario  : string;
    email    : string;
    password?: string;
    role     : string;

    createdAt?: string;
    updatedAt?: string;
}