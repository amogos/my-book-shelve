import * as ActionConstants from '../constants/action_constant';
import * as DataTypes from '../types';
import * as Actions from '../actions/index';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import { handleResultCode } from './tree_reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ActionConstants.ACTION_LOGIN_USER: {
            databseInstance.getUser(action.user, handleResultCode).then((result: DataTypes.UserRecordType) => {
                Store.dispatch(Actions.addUserData(result));
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_LOGIN_USER,
            });
        }
        case ActionConstants.ACTION_USER_DATA:
            return Object.assign({}, state, {
                userdata: action.userdata,
            });
        default:
            return state;
    }
}
