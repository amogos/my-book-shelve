import React from 'react';
import * as ActionTypes from '../constants/action_constant';
import ListBooksContainer from '../containers/list_books_container';
import AddNewBookContainer from '../containers/add_new_book_container';
import NotificationsContainer from '../containers/notifications_component_container';

interface Props {
    action: string;
}

const { PageActionConstant: TreeActionConstant } = ActionTypes.default;

const MainComponent = (props: Props) => {
    if (props.action === TreeActionConstant.ACTION_LIST_BOOKS) {
        return <ListBooksContainer />;
    } else if (
        props.action === TreeActionConstant.ACTION_GOTO_ADD_BOOK ||
        props.action === TreeActionConstant.ACTION_ADD_BOOK
    )
        return <AddNewBookContainer />;
    else if (props.action === TreeActionConstant.ACTION_GOTO_NOTIFICATIONS) return <NotificationsContainer />;
    else return null;
};

export default MainComponent;
