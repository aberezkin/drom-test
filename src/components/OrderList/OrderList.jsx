import React, { Component } from 'react';

import './OrderList.css';

class OrderList extends Component {
  render() {
    const { orders, onOrderDelete } = this.props;

    return (
      <div className="OrderList-root">
        <h3>Список записей</h3>
        <div className="OrderList-list">
          <table className="OrderList-table">
            <thead>
              <tr>
                <th>Город</th>
                <th>Адрес</th>
                <th>Дата, время</th>
                <th>Телефон</th>
                <th>Имя</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({id, address, city, time, phone, name}) => (
                <tr key={id}>
                  <td>{city}</td>
                  <td>{address}</td>
                  <td>{time}</td>
                  <td>{phone}</td>
                  <td>{name}</td>
                  <td className="OrderList-button">
                    <button
                      onClick={() => onOrderDelete(id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default OrderList;
