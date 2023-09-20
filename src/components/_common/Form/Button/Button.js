import React from 'react';
import PropTypes from 'prop-types';
import classes from './button.module.scss';

const Button = ({ children, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${classes.main_button} ${className}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Button.defaultProps = {
  className: '',
};

export default Button;
