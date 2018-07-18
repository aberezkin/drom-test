import App from './App';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  isPending: state.orders.isPending || state.cities.isFetching || state.timetable.isFetching,
});

export default connect(mapStateToProps)(App);
