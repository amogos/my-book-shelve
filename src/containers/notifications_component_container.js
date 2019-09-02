import { connect } from 'react-redux';
import { notificationAction } from '../actions/';
import NotificationComponent from '../components/notifications_component';

const mapDispatchToProps = dispatch => {
    return {
        confirmRental: rental => dispatch(notificationAction.confirmRental(rental)),
        rejectRental: rental => dispatch(notificationAction.rejectRental(rental)),
        getReturns: callback => dispatch(notificationAction.getReturnsForUser(callback)),
        getQueue: callback => dispatch(notificationAction.getQueueForUser(callback)),
        dispatch,
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(NotificationComponent);
