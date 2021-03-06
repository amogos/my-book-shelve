import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import FacebookComponent from '../components/facebook_component';

const mapDispatchToProps = dispatch => {
    return {
        addUserData: data => dispatch(Actions.addUserData(data)),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(FacebookComponent);
