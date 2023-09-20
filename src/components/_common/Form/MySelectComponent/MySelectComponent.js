import React, {
  useEffect, useId, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowDownSvg } from '../../../../assets/icons/ArrowDaownSvg.svg';
import classes from './mySelectComponent.module.scss';

const MySelectComponent = ({
  value,
  options,
  onChange,
  className,
  classNameText,
}) => {
  const [showOptions, toggleOption] = useState(false);
  const valueRef = useRef();
  const uniqId = useId();
  const top = valueRef.current?.offsetHeight || 0;

  const changeValue = (v) => {
    onChange(v);
    toggleOption(false);
  };

  useEffect(() => {
    window.addEventListener('click', closeOptions, true);

    return () => {
      window.removeEventListener('click', closeOptions, true);
    };
  }, []);

  const closeOptions = (e) => {
    if (!e.target.closest(`[id="select_wrapper_${uniqId}"]`)) toggleOption(false);
  };

  return (
    <div
      id={`select_wrapper_${uniqId}`}
      className={`${classes.wrapper} ${className}`}
    >
      <div
        className={classes.main_content}
        onClick={() => toggleOption((prevState) => !prevState)}
        onFocus={() => toggleOption(true)}
        onBlur={() => toggleOption(false)}
        ref={valueRef}
      >
        <p className={`${classes.main_content_text} ${classNameText}`}>{value}</p>

        <div className={`${classes.arrow_icon} ${showOptions ? classes.active_icon : ''}`}>
          <ArrowDownSvg />
        </div>
      </div>

      {showOptions
        && (
          <ul
            className={`${classes.options_list}`}
            style={{ top: `${top + 5}px` }}
          >

            {options.map((option) => (
              <li
                key={option}
                className={`${classes.options_item} ${value === option && classes.active_option}`}
                onClick={() => changeValue(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

MySelectComponent.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  classNameText: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};
MySelectComponent.defaultProps = {
  value: '',
  className: '',
  classNameText: '',
  options: [],
  onChange: () => {},
};
export default MySelectComponent;
