import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchSvg } from '../../../../assets/icons/SearchSvg.svg';
import classes from './input.module.scss';

const Input = ({
  placeholder, name, onChange, value,
  disabled, error, className, inputClassName, thereIsSearchBtn, classNameSvgBlock,
}) => (
  <div className={`${classes.input_block} ${className}`}>
    <label className={classes.label}>

      {thereIsSearchBtn && (
      <div className={`${classes.search_svg} ${classNameSvgBlock}`}>
        <div className={classes.svg_btn}>
          <SearchSvg />
        </div>
      </div>
      )}

      <input
        disabled={disabled}
        value={value}
        name={name}
        onChange={({ target }) => onChange(target.value)}
        className={`${classes.input} ${error ? classes.error : ''} ${inputClassName}`}
        placeholder={placeholder}
      />
    </label>
  </div>
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
  classNameSvgBlock: PropTypes.string,
  inputClassName: PropTypes.string,
  thereIsSearchBtn: PropTypes.bool,
};

Input.defaultProps = {
  error: false,
  name: '',
  placeholder: '',
  disabled: false,
  className: '',
  classNameSvgBlock: '',
  inputClassName: '',
  thereIsSearchBtn: false,
};
export default Input;
