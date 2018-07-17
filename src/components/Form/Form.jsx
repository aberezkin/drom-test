import React, { Component } from 'react';
import Dropdown from "../Dropdown";
import CityInfo from '../CityInfo';

import './Form.css';

const cityOptions = [
  {
    id: "5b3480ee3200009f28d1e421",
    name: "Владивосток",
    address: "ул. Первая 1, ст. 3",
    phones: [
      "79991233232",
      "79996667676"
    ],
    price: 12000
  },
  {
    id: "5b348105320000781bd1e422",
    name: "Приморск",
    address: "ул. Малая 9",
    phones: [
      "79990010101"
    ],
    price: 7500
  },
  {
    id: "5b3481173200005700d1e423",
    name: "Чекалин",
    address: "ул. Большая 4, к. 20",
    phones: [ ],
    price: 4200
  }
];

class Form extends Component {
  state = {
    city: "5b3480ee3200009f28d1e421",
  };

  updateField = (field, value) => {
    this.setState({ [field]: value })
  };

  render() {
    const cityInfo = cityOptions.find((city) => city.id === this.state.city);

    return (
      <div className="Form-root">
        <h3>Онлайн запись</h3>
        <div>
          <Dropdown
            placeholder="Город"
            options={cityOptions.map(city => ({ value: city.id, label: city.name }))}
            value={this.state.city}
            onChange={(value) => this.updateField('city', value)}
          />
          { <CityInfo {...cityInfo} /> }
        </div>
      </div>
    )
  }
}

export default Form;
