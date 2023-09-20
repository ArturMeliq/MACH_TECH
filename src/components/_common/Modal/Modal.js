import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CloseSvg } from '../../../assets/icons/xmark-solid.svg';
import classes from './modal.module.scss';

const Modal = ({
  show,
  classNameWrapper,
  className,
  classNameContent,
  children,
  onClose,
  modalTitle,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.width = `${document.body.getBoundingClientRect().width}px`;
      document.body.style.overflowY = 'hidden';
      document.body.ontouchmove = () => false;
    } else {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('width');
      document.body.ontouchmove = () => true;
    }
  }, [show]);

  useEffect(() => () => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('width');
    document.body.ontouchmove = () => true;
  }, []);

  return show && createPortal(
    <div className={`${classes.wrapper} ${classNameWrapper}`}>
      <div
        onClickCapture={onClose}
        className={classes.backdrop}
      />

      <div className={`${classes.modal} ${className}`}>
        <div className={classes.modal_header}>

          <h2 className={classes.modal_title}>
            {modalTitle}
          </h2>

          <CloseSvg onClick={onClose} />
        </div>

        <div className={`${classes.content} ${classNameContent}`}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('root'),
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  classNameContent: PropTypes.string,
  classNameWrapper: PropTypes.string,
  modalTitle: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  className: '',
  classNameContent: '',
  classNameWrapper: '',
};

export default Modal;
