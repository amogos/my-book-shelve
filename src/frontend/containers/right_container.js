import { connect } from 'react-redux';
import RightComponent from '../components/regions/right_component';

function mapStateToProps(state) {
    return { page: state.mainReducer.page };
}

export default connect(
    mapStateToProps,
    null,
)(RightComponent);
