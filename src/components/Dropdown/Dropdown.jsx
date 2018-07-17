import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import cx from 'classnames';
import arrow from './arrow.png';

import './Dropdown.css'

class Dropdown extends Component {
  state = {
    isOpen: false,
  };

  handleClickOutside = () => {
    this.setState({
      isOpen: false,
    })
  };

  toggleOptions = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  };

  closeOptions = () => {
    this.setState({
      isOpen: false,
    })
  };

  handleOptionClick = (value) => {
    this.closeOptions();
    this.props.onChange(value);
  };

  render() {
    const { options, placeholder, value } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="Dropdown-wrapper">
        <div
          className={cx('Dropdown-header', { open: this.state.isOpen })}
          onClick={this.toggleOptions}
        >
          <div className="Dropdщwn-value">
            { value ?
              options.find((o) => o.value === value).label :
              <span className="Dropdown-placeholder" >{placeholder}</span>
            }
          </div>
          <img
            className="Dropdown-arrow"
            src={arrow}
            alt=""
          />
        </div>
        {
          isOpen && <ul className="Dropdown-list">
            {options.map((option) => (
              <li
                className={cx("Dropdown-list-item", { active: option.value === value })}
                key={option.value}
                onClick={() => this.handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default onClickOutside(Dropdown);
