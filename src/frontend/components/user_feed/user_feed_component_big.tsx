import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import FeedItem from './feed_item';
import { History } from 'history';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: History;
}

const UserFeedComponentBig = (props: Props) => {
    return (
        <Aux>
            {props.userfeed === undefined
                ? null
                : props.userfeed.map((item, index) => (
                      <div key={index}>
                          <FeedItem item={item} />
                      </div>
                  ))}
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponentBig, 'user_feed_component_big'));