import { connect } from 'react-redux';
import ListBooksComponent from '../components/list_books_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.socialReducer.userdata,
        bookChangingId: state.treeReducer.bookChangingId,
        action: state.treeReducer.action,
        booksArray: state.treeReducer.booksArray,
        queueArray: state.treeReducer.queueArray,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookId => dispatch(bookAction.deleteBook(bookId)),
        askBook: (bookId, ownerId) => dispatch(bookAction.askBook(bookId, ownerId)),
        returnBook: bookId => dispatch(bookAction.returnBook(bookId)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListBooksComponent);
