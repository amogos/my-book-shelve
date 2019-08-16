import * as ActionTypes from '../../constants/action_constant';

class BookAction {
    public askBook = (bookId: number, ownerId: number, duration: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_ASK_BOOK,
        bookId,
        ownerId,
        duration,
    });

    public returnBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_RETURN_BOOK,
        bookId,
    });

    public deleteBook = (bookId: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_DELETE_BOOK,
        bookId,
    });

    public reviewBook = (bookId: number, comment: string, contentScore: number, stateScore: number) => ({
        type: ActionTypes.default.BookActionConstant.ACTION_REVIEW_BOOK,
        bookId,
        comment,
        contentScore,
        stateScore,
    });
}

export default BookAction;
