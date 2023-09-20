import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './checkbox.module.scss';

const Checkbox = ({ text, SVG }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={classes.wrapper}>
      {SVG && <SVG className={classes.svg} onClick={() => setChecked((prevState) => !prevState)} />}

      <label
        className={classes.label}
      >
        <input
          className={classes.input}
          type="checkbox"
          checked={checked}
          onChange={({ target }) => setChecked(target.checked)}
        />

        <span className={classes.checkmark} />

      </label>

      <p className={classes.text} onClick={() => setChecked((prevState) => !prevState)}>
        {text}
      </p>
    </div>

  );
};

Checkbox.propTypes = {
  text: PropTypes.string,
  SVG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.elementType,
  ]),
};

Checkbox.defaultProps = {
  text: '',
  SVG: '',
};
export default Checkbox;
