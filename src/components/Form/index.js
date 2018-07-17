import { connect } from 'react-redux';
import Form from './Form';
import { changeCity } from "../../state/actions";

const mapStateToProps = (state) => ({
  cities: state.cities.items,
  city: state.cities.chosen,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange: (city) => dispatch(changeCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
