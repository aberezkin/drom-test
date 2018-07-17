import { connect } from 'react-redux';
import Form from './Form';
import { changeCity, fetchTimetableIfNeeded } from "../../state/actions";

const mapStateToProps = (state) => ({
  cities: state.cities.items,
  city: state.cities.chosen,
  timetable: state.timetable.items[state.cities.chosen] || [],
  areCitiesFetching: state.cities.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => {
    dispatch(changeCity(city));
    dispatch(fetchTimetableIfNeeded(city));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
