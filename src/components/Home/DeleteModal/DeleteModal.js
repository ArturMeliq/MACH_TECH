import React from 'react';
import PropTypes from 'prop-types';
import classes from './deleteModal.module.scss';
import Button from '../../_common/Form/Button/Button';
import Modal from '../../_common/Modal/Modal';

const DeleteModal = ({
  onClose,
  onConfirm,
  text,
  show,
}) => (
  <Modal
    onClose={onClose}
    show={show}
  >
    <div className={classes.are_you_sure_block}>
      <p className={classes.are_you_sure_text}>
        {text}
      </p>

      <div className={classes.delete_buttons_block}>
        <Button
          className={classes.delete_button_yes}
          onClick={onConfirm}
        >
          Да
        </Button>

        <Button
          onClick={onClose}
          className={classes.delete_button_cancel}
        >
          Нет
        </Button>
      </div>
    </div>

  </Modal>
);
DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default DeleteModal;
