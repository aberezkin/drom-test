import { connect } from 'react-redux';
import OrderList from './OrderList';
import { deleteOrder } from "../../state/actions";

const mapStateToProps = ({ orders: { items } }) => ({
  orders: items,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderDelete: (id) => dispatch(deleteOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

