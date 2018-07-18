import { connect } from 'react-redux';
import Form from './Form';
import { changeCity, fetchTimetableIfNeeded, putOrder } from "../../state/actions";

const mapStateToProps = (state) => ({
  cities: state.cities.items,
  city: state.cities.chosen,
  timetable: state.timetable.items[state.cities.chosen] || [],
  areCitiesFetching: state.cities.isFetching,
  disabled: state.orders.isPending,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => {
    dispatch(changeCity(city));
    dispatch(fetchTimetableIfNeeded(city));
  },
  onOrder: (data) => dispatch(putOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
