import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CityInfo.css';

const formatPhone = (phone) => {
  return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9-11)}`
};

const intersperse = (arr, sep) => {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((xs, x) => {
    return xs.concat([sep, x]);
  }, [arr[0]]);
};

class CityInfo extends Component {

  render() {
    const { address, phones, price } = this.props;

    return (
      <div className="CityInfo-wrapper">
        <span>{address}</span> <br/>
        { phones.length > 0  && <span>
          {
            intersperse(
              phones.map((phone) => <span key={phone} className="CityInfo-phone">{formatPhone(phone)}</span>),
              ', '
            )
          }
          <br/>
        </span> }
        <span>Стоймойсть услуги: {price} ₽</span>
      </div>
    )
  }
}

CityInfo.propTypes = {
  address: PropTypes.string.isRequired,
  phones: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired
};

export default CityInfo;
