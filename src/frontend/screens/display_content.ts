import { DisplayBook } from './display_book';
import { DisplayBookListing } from './display_book_listing';
import { DisplaySpaceListing } from './display_space_listing';
import { DisplayProfileSettings } from './display_profile_settings';
import { DisplayFeed } from './display_feed';
import { DisplaySubscription } from './display_subscription';
import { DisplayUnSubscription } from './display_unsubscription';
import { PageNotFound } from '../components/errors/page_not_found';
import * as DataTypes from '../../shared/types';
import { AppPages } from '../../shared/types';

export const DisplayContent = (page: DataTypes.AppPages) => {
    switch (page) {
        case AppPages.Book:
            return DisplayBook();
        case AppPages.Books:
            return DisplayBookListing();
        case AppPages.Spaces:
            return DisplaySpaceListing();
        case AppPages.Settings:
            return DisplayProfileSettings();
        case AppPages.Feed:
            return DisplayFeed();
        case undefined:
            return DisplaySpaceListing();
        case AppPages.Subscribe:
            return DisplaySubscription();
        case AppPages.Unsubscribe:
            return DisplayUnSubscription();
        default:
            return PageNotFound();
    }
};
