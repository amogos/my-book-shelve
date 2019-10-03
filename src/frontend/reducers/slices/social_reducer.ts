import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { socialAction, pageAction } from './../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../../store';
import { handleError } from './../main_reducer';

const { SocialActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state: any, action: any): any {
    switch (action.type) {
        case ActionConstants.default.SocialActionConstant.ACTION_LOGIN_USER: {
            databseInstance
                .getUserRecordTypeFromValueType(action.user, handleError)
                .then((result: DataTypes.UserRecordType) => {
                    Store.dispatch(socialAction.addUserData(result));
                });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGIN_USER,
            });
        }
        case SocialActionConstant.ACTION_USER_DATA:
            databseInstance.getUserSpaces(action.userdata, handleError).then((result: DataTypes.SpaceType[]) => {
                let spacesArrays: DataTypes.Spaces = { userSpaces: [], otherSpaces: [] };
                spacesArrays.userSpaces = result;
                databseInstance.getOtherSpaces(action.userdata, handleError).then((result: DataTypes.SpaceType[]) => {
                    spacesArrays.otherSpaces = result;
                    Store.dispatch(pageAction.refreshState({ spaces: spacesArrays }));
                });
            });

            databseInstance.getLanguages(handleError).then((result: DataTypes.LanguageRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ spaces: result }));
            });
            databseInstance.getCategories(handleError).then((result: DataTypes.CategoryRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ categories: result }));
            });
            return Object.assign({}, state, {
                userdata: action.userdata,
            });

        default:
            return null;
    }
}
