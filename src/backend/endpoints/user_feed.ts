import axios from 'axios';
import { urlUserFeed } from './constants';
import * as DataTypes from '../../shared/types';
import { getBookRecordTypeFromId } from './../endpoints/books';
import { getSpaceTypeFromId } from './../endpoints/spaces';
import { getBookDescriptionForISBN } from './../endpoints/books_descriptions';
import { getUserRecordTypeFromId } from './../endpoints/user';

export async function getFeeds(
    currentUserId: number,
    filters: string[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.UserFeedRecordType[]> {
    let rawFeeds: DataTypes.UserFeedRawRecordType[] = [];
    let urlFeeds = `${urlUserFeed}?userId_ne=${currentUserId}&_sort=date&_order=desc`;
    const applyFilters = filters && filters.length > 0;

    if (applyFilters) {
        urlFeeds += filters.join('&');
    }

    await axios
        .get(urlFeeds)
        .then(response => (rawFeeds = response.data))
        .catch(error => onError(error));

    const feeds: DataTypes.UserFeedRecordType[] = [];

    for (let i = 0; i < rawFeeds.length; i++) {
        const rawData: DataTypes.UserFeedRawRecordType = rawFeeds[i];
        const feedData: DataTypes.UserFeedRecordType = DataTypes.UserFeedRecordTypeFromRawType(rawData);

        feedData.user = await getUserRecordTypeFromId(rawData.userId, onError);

        if (rawData.book !== undefined) {
            const bookData: DataTypes.BookRecordType = await getBookRecordTypeFromId(rawData.book as number, onError);
            const descriptionData = await getBookDescriptionForISBN(bookData.isbn10, bookData.isbn13, onError);
            feedData.book = bookData;
            feedData.bookDescription = descriptionData;
        } else if (rawData.space !== undefined) {
            const spaceData: DataTypes.SpaceType = await getSpaceTypeFromId(rawData.space, onError);
            feedData.space = spaceData;
        }

        feeds.push(feedData);
    }
    return feeds;
}

export async function addFeed(
    feed: DataTypes.UserFeedRawValueType,
    onError: (resultCode: number) => void,
): Promise<void> {
    await axios.post(urlUserFeed, feed).catch(error => onError(error));
}
