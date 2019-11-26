import { UserRecordType, NullUserRecordType } from './user_types';

export interface BookReviewRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
    user: UserRecordType;
    date: string;
}

export const NullBookReviewRecordType = (): BookReviewRecordType => {
    return { id: 0, isbn10: '', isbn13: '', comment: '', score: 0, user: NullUserRecordType, date: '' };
};

export interface BookReviewRawRecordType {
    id: number;
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
    user: number;
    date: string;
}

export const NullBookReviewRawRecordType = (): BookReviewRawRecordType => {
    return { id: 0, isbn10: '', isbn13: '', comment: '', score: 0, user: 0, date: '' };
};

export interface BookReviewRawValueType {
    isbn10: string;
    isbn13: string;
    comment: string;
    score: number;
    user: number;
}

export const NullBookReviewRawValueType: BookReviewRawValueType = {
    isbn10: '',
    isbn13: '',
    comment: '',
    score: 0,
    user: 0,
};

export interface BookReviewStatisticsType {
    contentScore: number;
    numReviews: number;
}

export const NullBookReviewStatisticsType: BookReviewStatisticsType = {
    contentScore: 0,
    numReviews: 0,
};
