import React, { useState } from 'react';
import { Divider, Comment, Avatar, Rate, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import BookDescription from './book/book_description';
import LikeBook from './book/like_book';

interface Props {
    book: DataTypes.BookRecordType;
    bookReviews: DataTypes.BookReviewRecordType[];
    likeReview(review: DataTypes.BookReviewRawRecordType): void;
    likeBook(book: DataTypes.BookRecordType): void;
}

const Review = (props: Props, entry: DataTypes.BookReviewRecordType) => {
    const [likes, setLikes] = useState(entry.likes);
    const rawReview = DataTypes.ToBookReviewRawRecordType(entry);

    const likeReview = () => {
        const newLikesCount = likes + 1;
        rawReview.likes = newLikesCount;
        entry.likes = newLikesCount;
        setLikes(newLikesCount);
        props.likeReview(rawReview);
    };

    return (
        <Comment
            author={
                <a>
                    {entry.user.name} rated it
                    <Rate className="review_rating" disabled defaultValue={entry.score} />
                </a>
            }
            avatar={<Avatar src={entry.user.picture} alt={entry.user.name} />}
            content={
                <div>
                    <p>{entry.comment}</p>
                    {likes} likes <Button onClick={likeReview}>Like</Button>
                </div>
            }
            datetime={<span>{entry.date}</span>}
        />
    );
};

const BookDisplayComponent = (props: Props) => {
    const { book, bookReviews } = props;

    if (!book || book.id === 0) return null;
    if (!bookReviews) return null;

    return (
        <Aux>
            <div className="book_icon_small">
                <img alt="logo" src={book.image} />
            </div>
            {book.title}
            <br />
            Author: {book.author.toString()} <br />
            Format: {book.format} <br />
            Language: {book.language.title}
            <br />
            PageCount: {book.length} <br />
            <BookDescription description={book.description} length={200} />
            <LikeBook {...props} />
            <Divider />
            {bookReviews.map(entry => Review(props, entry))}
        </Aux>
    );
};

export default withStyle(BookDisplayComponent, 'book_display_component');