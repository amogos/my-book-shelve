import { number } from 'prop-types';

export interface UserRecordType {
    id: number;
    value: UserValueType;
}

export interface UserValueType {
    name: string | undefined;
    email: string;
}

export interface BookValueType {
    title: string;
    author: string;
    language: LanguageRecordType;
    image: string;
    owner: UserRecordType;
    holder: UserRecordType;
    state: string;
}

export interface LanguageRecordType {
    id: number;
    language: string;
}

export interface BookRecordType {
    id: number;
    value: BookValueType;
}

export interface RentalNotificationRecordType {
    bookId: number;
    value: RentalNotificationValue;
}

export interface RentalNotificationValue {
    user: UserRecordType;
    bookTitle: string;
}

export interface QueueValueType {
    bookId: number;
    userId: number;
    ownerId: number;
}

export interface QueueRecordType {
    id: number;
    value: QueueValueType;
}

export const nullUser: UserRecordType = { value: { name: '', email: '' }, id: 0 };
export const nullLanguage: LanguageRecordType = { id: 0, language: '' };
