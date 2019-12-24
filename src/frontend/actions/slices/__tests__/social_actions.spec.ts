import * as ActionTypes from '../../../../shared/constants/action_constant';
import { socialAction } from '../../index';
import * as DataTypes from '../../../../shared/types';

const { SocialActionConstant } = ActionTypes.default;

describe('addUserData(userdata: DataTypes.UserRecordType)', () => {
    it('should build action for adding user data', () => {
        const userdata = DataTypes.NullUserRecordType();
        const expectedAction = {
            type: SocialActionConstant.ACTION_USER_DATA,
            userdata: userdata,
        };
        expect(socialAction.addUserData(userdata)).toEqual(expectedAction);
    });
});