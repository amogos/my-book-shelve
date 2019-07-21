import { connect } from 'react-redux';
import BookStateComponent from '../components/book_state_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        bookChangingId: state.mainReducer.bookChangingId,
        action: state.mainReducer.action,
        queueArray: state.mainReducer.queueArray,
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
)(BookStateComponent);
