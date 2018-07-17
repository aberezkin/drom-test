import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropdown from "../Dropdown";
import CityInfo from '../CityInfo';

import './Form.css';

const validators = {
  date: (value) => {
    const res = [];
    if (!value) res.push('Пожалуйста, выберите дату');
    return res;
  },
  time: (value) => {
    const res = [];
    if (!value) res.push('Пожалуйста, выберите время');
    return res;
  },
  phone: (value) => {
    const res = [];
    if (!value || value.length === 0)
      res.push('Пожалуйста, введите корректный телефон, иначе наши специалисты не смогут связаться с вами');
    return res;
  },
  name: (value) => {
    const res = [];
    if (!value || value.length === 0)
      res.push('Пожалуйста, укажите имя')
    return res;
  }
};

class Form extends Component {
  state = {
    date: null,
    time: null,
    phone: '',
    value: '',
    validation: {
      date: {
        touched: false,
        errors: [],
      },
      time: {
        touched: false,
        errors: [],
      },
      phone: {
        touched: false,
        errors: [],
      },
      name: {
        touched: false,
        errors: [],
      },
    },
  };

  updateCity = (city) => {
    this.setState({ city });
  };

  updateField = (field, value) => {
    this.setState({
      [field]: value
    })
  };

  validate = (field) => {
    this.setState({
      validation: {
        ...this.state.validation,
        [field]: {
          touched: true,
          errors: validators[field](this.state[field]),
        }
      },
    })
  };

  isFieldInvalid = (field) => {
    const fieldInfo = this.state.validation[field];
    return fieldInfo.touched && fieldInfo.errors.length > 0;
  };

  isFormInvalid = () => {
    return Object.values(this.state.validation)
      .map((data) => !data.touched || data.errors.length === 0)
      .reduce((acc, el) => acc && el)
  };

  render() {
    const { cities, city, onCityChange } = this.props;
    const cityInfo = cities.find((c) => c.id === city);

    return (
      <div className="Form-root">
        <h3>Онлайн запись</h3>
        <div>
          <Dropdown
            placeholder="Город"
            headerClass="Form-city"
            options={cities.map(city => ({ value: city.id, label: city.name }))}
            value={city}
            onChange={onCityChange}
          />
          { city && <CityInfo {...cityInfo} /> }
          <div className="Form-datetime">
            <div>
              <Dropdown
                headerClass={cx({ invalid: this.isFieldInvalid('date') })}
                placeholder="Дата"
              />
            </div>
            <div>
              <Dropdown
                headerClass={cx({ invalid: this.isFieldInvalid('time') })}
                placeholder="Время"
              />
            </div>
          </div>
          {this.state.validation.date.errors.map((err, i) =>
            <p className="Form-error" key={i}>
              {err}
            </p>
          )}
          {this.state.validation.time.errors.map((err, i) =>
            <p className="Form-error" key={i}>
              {err}
            </p>
          )}
          <div className="Form-input">
            <input
              className={cx({ invalid: this.isFieldInvalid('phone') })}
              type="text"
              placeholder="+7 (___) ___-__-__"
              value={this.state.phone}
              onChange={(e) => this.updateField('phone', e.target.value)}
              onBlur={() => this.validate('phone')}
            />
          </div>
          {this.state.validation.phone.errors.map((err, i) =>
            <p className="Form-error" key={i}>
              {err}
            </p>
          )}
          <div className="Form-input">
            <input
              className={cx({ invalid: this.isFieldInvalid('name') })}
              type="text"
              placeholder="Ваше имя"
              value={this.state.name}
              onChange={(e) => this.updateField('name', e.target.value)}
              onBlur={() => this.validate('name')}
            />
          </div>
          {this.state.validation.name.errors.map((err, i) =>
            <p className="Form-error" key={i}>
              {err}
            </p>
          )}
          <div className="Form-button">
            <button disabled={this.isFormInvalid()}>Записаться</button>
          </div>
          <p className="Form-agreement">
            Нажимая "Записаться", я выражаю свое согласие с обработкой
            моих персональных данных в соответсвии с принятой <a href="#">политикой конфиденциальности</a> и
            принимаю <a href="#">пользовательское соглажение</a>
          </p>
        </div>
      </div>
    )
  }
}

Form.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default Form;
