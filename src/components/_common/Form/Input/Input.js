import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchSvg } from '../../../../assets/icons/SearchSvg.svg';
import { ReactComponent as FolderSvg } from '../../../../assets/icons/folders/FolderSvg1.svg';
import { ReactComponent as EyeSvg1 } from '../../../../assets/icons/EyeSvg1.svg';
import { ReactComponent as EyeSvg2 } from '../../../../assets/icons/EyeSvg2.svg';
import { ReactComponent as CopySvg } from '../../../../assets/icons/CopySvg.svg';
import classes from './input.module.scss';

const Input = ({
  placeholder, name, onChange, value, onClick,
  disabled, error, className, inputClassName, type, showPassWord,
  classNameText, classNameLabel, classNameSvgBlock, label, thereIsSearchBtn,
  thereIsFolderBtn, isCopyTextInput, onCopy,
}) => {
  const inputRef = useRef();
  const inputClasses = [classes.input, inputClassName];
  if (showPassWord) inputClasses.push(classes.more_padding);
  if (thereIsSearchBtn) inputClasses.push(classes.padding_left);
  if (error) inputClasses.push(classes.error);

  return (
    <div className={`${classes.input_block} ${className}`}>
      <label className={`${classes.label} ${classNameLabel}`}>
        {label
          && <p className={`${classes.text} ${classNameText}`}>{label}</p>}

        {thereIsSearchBtn && (
          <div className={`${classes.search_svg} ${classNameSvgBlock}`}>
            <SearchSvg />
          </div>
        )}

        <input
          disabled={disabled}
          value={value}
          name={name}
          onChange={({ target }) => onChange(target.value)}
          className={inputClasses.join(' ')}
          placeholder={placeholder}
          type={type}
          ref={inputRef}
        />

        {thereIsFolderBtn && (
          <div
            className={classes.folder_svg}
            onClick={(e) => onClick(e)}
          >
            <FolderSvg />
          </div>
        )}

        {(showPassWord || isCopyTextInput) && (
          <div
            className={classes.copy_and_password_svg}
          >
            {isCopyTextInput && (
            <div
              className={classes.copy_svg}
              onClick={(e) => onCopy(e, inputRef)}
            >
              <CopySvg />
            </div>
            )}

            {showPassWord
              && (
              <div
                className={classes.password_svg}
                onClick={(e) => onClick(e)}
              >
                {type === 'text' ? <EyeSvg1 /> : <EyeSvg2 />}
              </div>
              )}

          </div>
        )}
      </label>
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  showPassWord: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
  classNameSvgBlock: PropTypes.string,
  classNameText: PropTypes.string,
  classNameLabel: PropTypes.string,
  inputClassName: PropTypes.string,
  thereIsSearchBtn: PropTypes.bool,
  thereIsFolderBtn: PropTypes.bool,
  isCopyTextInput: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  onClick: () => {},
  onCopy: () => {},
  error: false,
  name: '',
  placeholder: '',
  label: '',
  disabled: false,
  showPassWord: false,
  className: '',
  classNameSvgBlock: '',
  classNameLabel: '',
  classNameText: '',
  inputClassName: '',
  thereIsSearchBtn: false,
  thereIsFolderBtn: false,
  isCopyTextInput: false,
};
export default Input;
