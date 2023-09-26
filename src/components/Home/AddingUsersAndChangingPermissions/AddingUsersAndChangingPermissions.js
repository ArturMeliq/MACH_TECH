import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseSvg } from '../../../assets/icons/xmark-solid.svg';
import classes from './addingUsersAndChangingPermissions.module.scss';
import Input from '../../_common/Form/Input/Input';

const AddingUsersAndChangingPermissions = ({
  title, className, children, classNameChildrenBlock, onClose,
}) => {
  const [value, setValue] = useState('');
  const change = (val) => {
    setValue(val);
  };

  return (
    <div
      className={`${classes.wrapper} ${className}`}
      style={{ border: !title && 'none' }}
    >
      {title && (
      <div className={classes.header}>
        <p className={classes.title}>{title}</p>

        <div className={classes.close_icon} onClick={onClose}>
          <CloseSvg />
        </div>
      </div>
      )}

      <div className={classes.main_content} style={{ height: !title && '100%' }}>
        <div style={{ padding: '10px 25px', width: '100%' }}>
          <Input
            value={value}
            onChange={change}
            placeholder="Поиск"
            thereIsSearchBtn
            className={classes.input}
            inputClassName={classes.change_input}
            classNameSvgBlock={classes.search_btn_icon}
          />
        </div>

        <div className={classNameChildrenBlock}>
          {children}
        </div>
      </div>
    </div>
  );
};

AddingUsersAndChangingPermissions.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  classNameChildrenBlock: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

AddingUsersAndChangingPermissions.defaultProps = {
  onClose: () => {},
  title: '',
  className: '',
  classNameChildrenBlock: '',
};
export default AddingUsersAndChangingPermissions;
