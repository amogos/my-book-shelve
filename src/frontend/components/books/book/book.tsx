import React from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Rate } from 'antd';
import BookStateComponent from './book_state';
import BookAvailabilityComponent from './book_availability';
import BooksDescription from './book_description';
import Aux, { withStyle } from '../../aux_component';
import * as DataTypes from '../../../../shared/types';

interface ReviewState {
    reviews: DataTypes.BookReviewRecordType[];
    visibility: boolean;
}

interface Props {
    userdata: DataTypes.UserRecordType;
    queueArray: DataTypes.QueueNotificationRecordType[];
    book: DataTypes.BookRecordType;
    reviewBook(review: DataTypes.BookReviewRawValueType): void;
    displayBook(bookId: number): void;
    deleteBook(bookId: number): void;
    askBook(bookId: number, ownerId: number, duration: number): void;
    returnBook(bookId: number): void;
    history: any;
}

const BookComponent = (props: Props) => {
    const item = props.book;

    const onBookTitleCliked = () => {
        props.displayBook(props.book.id);
        props.history.push(`/book`);
    };

    return (
        <Aux key={`k${item.id}`}>
            <div className="book_left">
                <img alt="logo" src={item.image} />
            </div>
            <div className="book_right">
                <Button className="book_title" type="link" onClick={onBookTitleCliked}>
                    {item.title} by {item.author.toString()}{' '}
                    <span className="book_rating">
                        <Rate disabled defaultValue={item.contentScore} />{' '}
                    </span>
                </Button>
                <BooksDescription description={item.description} length={200} />

                <BookAvailabilityComponent book={item} />
                <div className="book_state">
                    <BookStateComponent {...props} book={item} />
                </div>
            </div>
        </Aux>
    );
};

export default withRouter(withStyle(BookComponent, 'book'));
