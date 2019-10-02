import React from 'react';
import * as DataTypes from '../../../shared/types';
import SpaceHolder from './space_holder';
import Aux, { withStyle } from './../aux_component';

interface Props {
    spaces: DataTypes.Spaces;
    userdata: DataTypes.UserRecordType;
    gotoListBooks(filters: string[]): void;
    followSpace: (spaceId: number, callback: () => void) => void;
    unfollowSpace: (spaceId: number, callback: () => void) => void;
}

const ListSpacesComponent = (props: Props) => {
    const loggedIn = props.userdata && props.userdata != DataTypes.NullUser;
    if (!loggedIn) return null;
    if (!props.spaces || !props.spaces.userSpaces || !props.spaces.otherSpaces) return null;

    const onSpaceClicked = (spaceId: number) => {
        let filters = [`space=${spaceId}`];
        props.gotoListBooks(filters);
    };

    function onChange(slideNumber: number) {}

    return (
        <Aux>
            <p className="thicker">All Spaces</p>
            <p className="thicker">My Spaces</p>
            {props.spaces.userSpaces.map(item => (
                <SpaceHolder
                    key={item.id}
                    item={item}
                    followSpace={props.followSpace}
                    unfollowSpace={props.unfollowSpace}
                    onClick={() => onSpaceClicked(item.id)}
                    userdata={props.userdata}
                />
            ))}
            <p />
            <p className="thicker">Other Spaces</p>
            {props.spaces.otherSpaces.map(item => (
                <SpaceHolder
                    key={item.id}
                    item={item}
                    followSpace={props.followSpace}
                    unfollowSpace={props.unfollowSpace}
                    onClick={() => onSpaceClicked(item.id)}
                    userdata={props.userdata}
                />
            ))}
        </Aux>
    );
};

export default withStyle(ListSpacesComponent, 'list_spaces_component');