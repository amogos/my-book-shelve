export interface UserType {
    id: number;
    name: string;
    email: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: string;
    image: string;
    owner: UserType;
    holder: UserType;
    state: string;
}

export interface BookRecordType {
    id: number;
    value: BookValueType;
}

export interface BookPendingNotification {
    user: UserType;
    bookTitle: string;
    bookKey: number;
}

export const nullUser: UserType = { name: '', email: '' };
