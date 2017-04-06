import React, { Component, PropTypes } from 'react';
import css from './input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      valid: !props.required,
      value: ''
    };
  }

  render() {
    const {
      handleChange,
      hideLabel,
      id,
      inline,
      inputClass,
      inputType,
      labelName,
      ...otherProps
    } = this.props;

    const { dirty, valid } = this.state;

    const selectedHandler =  handleChange ? handleChange : this.setValue;
    const selectedClass = inputClass ? inputClass : '';
    const selectedError = dirty && !valid ? css.error : '';

    const inputBuilder = () => {
      switch (inputType) {
        case 'password':
        case 'number':
        case 'email':
        case 'text':
        default:
          return (
            <input
              id={id}
              type={inputType}
              onKeyUp={selectedHandler}
              onBlur={this.setDirty}
              className={`${css.input} ${selectedError} ${selectedClass}`}
              {...otherProps}
            />
          );
      }
    };

    const labelBuilder = () => {
      return !hideLabel ? (
        <label
          className={css.label}
          htmlFor={id}>
          {labelName.toUpperCase()}
        </label>
      ) : null;
    };

    return buildInput(inputBuilder(), labelBuilder(), inline);
  }

  setValue = (event) => {
    const { dirty } = this.state;
    const { required } = this.props;
    const value = event.target.value;
    let valid = true;
    if (required && dirty) {
      valid = validate(value);
    }
    this.setState({ value, valid });
  };

  setDirty = (event) => {
    const { required } = this.props;
    const value = event.target.value;
    const dirty = true;
    let valid = true;
    if (required) {
      valid = validate(value);
    }
    this.setState({ dirty, valid, value });
  };

}

function validate(value) {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  return true;
}

function buildInput(input, label, inline) {
  if (!label) {
    return input;
  }

  if (!inline) {
    return (
      <div className={css.common}>
        <div>
          {label}
        </div>
        <div>
          {input}
        </div>
      </div>
    );
  }

  return (
    <div className={`${css.common} ${css.inline}`}>
      {label}
      {input}
    </div>
  );
}

Input.propTypes = {
  handleChange: PropTypes.func,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  inline: PropTypes.bool,
  inputClass: PropTypes.string,
  inputType: PropTypes.string,
  labelName: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default Input;
