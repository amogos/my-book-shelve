import React from 'react';
import * as ActionTypes from '../constants/action_constant';
import ListBooksContainer from '../containers/list_books_container';
import NotificationsContainer from '../containers/notifications_component_container';

interface Props {
    action: string;
}

const { PageActionConstant } = ActionTypes.default;

const MainComponent = (props: Props) => {
    if (props.action === PageActionConstant.ACTION_LIST_BOOKS || props.action === PageActionConstant.ACTION_ADD_BOOK) {
        return <ListBooksContainer />;
    } else if (props.action === PageActionConstant.ACTION_GOTO_NOTIFICATIONS) return <NotificationsContainer />;
    else return null;
};

export default MainComponent;
