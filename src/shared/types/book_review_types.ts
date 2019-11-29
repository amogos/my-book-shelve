import { UserRecordType, NullUserRecordType } from './user_types';

export interface BookReviewRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
    user: UserRecordType;
    date: string;
    likes: number;
}

export const NullBookReviewRecordType = (): BookReviewRecordType => {
    return { id: 0, isbn10: '', isbn13: '', comment: '', score: 0, user: NullUserRecordType, date: '', likes: 0 };
};

export interface BookReviewRawRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
    user: number;
    date: string;
    likes: number;
}

export const NullBookReviewRawRecordType = (): BookReviewRawRecordType => {
    return { id: 0, isbn10: '', isbn13: '', comment: '', score: 0, user: 0, date: '', likes: 0 };
};

export interface BookReviewRawValueType {
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
    user: number;
    date: string;
    likes: number;
}

export const NullBookReviewRawValueType = (): BookReviewRawValueType => {
    return { isbn10: '', isbn13: '', comment: '', score: 0, user: 0, date: '', likes: 0 };
};

export interface BookReviewStatisticsType {
    contentScore: number;
    numReviews: number;
}

export const NullBookReviewStatisticsType = (): BookReviewStatisticsType => {
    return { contentScore: 0, numReviews: 0 };
};

export const ToBookReviewRawRecordType = (from: BookReviewRecordType) => {
    let to: BookReviewRawRecordType = NullBookReviewRawRecordType();
    to = { ...from, user: from.user.id };
    return to;
};