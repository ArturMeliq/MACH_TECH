import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Modal from '../../../_common/Modal/Modal';
import Input from '../../../_common/Form/Input/Input';
import classes from './createUpdatePassword.module.scss';
import colors from '../../../../helpers/staticData/Colors/colors';
import Button from '../../../_common/Form/Button/Button';
import { addPassword } from '../../../../store/actions/Passwords';

const CreateUpdatePassword = ({
  fields,
  onClose,
  show,
  modalTitle,
}) => {
  const [allValues, setAllValues] = useState({
    folderId: fields?.folderId || '',
    id: fields?.id || '',
    name: fields?.name || '',
    login: fields?.login || '',
    password: fields?.password || '',
    repeatPassword: fields?.repeatPassword || '',
    url: fields?.url || '',
    comments: fields?.comments || '',
    passwordColor: fields?.passwordColor || '',
  });
  const [errors, setErrors] = useState({});
  const [type, setType] = useState({
    password: 'password',
    repeatPassword: 'password',
  });

  const folderId = useSelector((state) => state.folderPasswordId.folderId);
  const passwords = useSelector((state) => state.passwords);
  const dispatch = useDispatch();

  const showingInputs = [
    {
      path: 'name',
      placeholder: 'Название проект',
      label: 'Название',
    },
    {
      path: 'login',
      placeholder: 'login',
      label: 'Логин:',
    },
    {
      path: 'password',
      placeholder: 'password',
      label: 'Пароль:',
      onClick: () => showingPassword('password'),
      showPassWord: true,
      inputType: type.password,
    },
    {
      path: 'repeatPassword',
      placeholder: 'repeat password',
      label: 'Повторите:',
      onClick: () => showingPassword('repeatPassword'),
      showPassWord: true,
      inputType: type.repeatPassword,
    },
    {
      path: 'url',
      placeholder: 'url',
      label: 'URL:',
    },
  ];

  const changingValues = (path, v) => {
    setAllValues((prevState) => ({
      ...prevState,
      [path]: v,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [path]: false,
    }));
  };

  const showingPassword = (path) => {
    if (path === 'password') {
      if (type.password === 'text') {
        setType((prevState) => (
          {
            ...prevState,
            password: 'password',
          }
        ));
      }
      if (type.password === 'password') {
        setType((prevState) => (
          {
            ...prevState,
            password: 'text',
          }
        ));
      }
    }
    if (path === 'repeatPassword') {
      if (type.repeatPassword === 'text') {
        setType((prevState) => (
          {
            ...prevState,
            repeatPassword: 'password',
          }
        ));
      }
      if (type.repeatPassword === 'password') {
        setType((prevState) => (
          {
            ...prevState,
            repeatPassword: 'text',
          }
        ));
      }
    }
  };

  const saveAllFields = () => {
    let errorText = '';
    let hasError = false;

    _.forEach(allValues, (value, key) => {
      if (!(key === 'id') && !(key === 'folderId')) {
        if (!value.trim()) {
          errorText = 'Все поля обязательны';
          hasError = true;
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'Все поля обязательны',
          }));
        } else if (((key === 'name' || key === 'login') && value.length < 4)) {
          errorText = 'Требуемая длина минимум 3 символа';
          hasError = true;
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'Требуемая длина минимум 3 символа',
          }));
        } else if (key === 'password') {
          if (allValues.password !== allValues.repeatPassword) {
            hasError = true;
            errorText = 'Пароль не совпадает';
            setErrors((prevState) => ({
              ...prevState,
              repeatPassword: 'Пароль не совпадает',
            }));
          }
          if (value.length < 6) {
            hasError = true;
            errorText = 'Требуемая длина минимум 6 символа';
            setErrors((prevState) => ({
              ...prevState,
              password: 'Требуемая длина минимум 6 символа',
            }));
          }
        } else if ((key === 'comments') && value.length > 1200) {
          hasError = true;
          errorText = 'Требуемая длина максимум 1200 символа';

          setErrors((prevState) => ({
            ...prevState,
            password: 'Требуемая длина максимум 1200 символа',
          }));
        }
      }
    });

    if (!hasError) {
      dispatch(addPassword({
        ...allValues,
        folderId,
        id: Math.max(Math.max(...passwords.map(({ id }) => id))) + 1,
      }));

      toast.success('Успешно создано');
      setAllValues({
        folderId: '',
        id: '',
        name: '',
        login: '',
        password: '',
        repeatPassword: '',
        url: '',
        comments: '',
        passwordColor: '',
      });
      onClose();
    } else {
      toast.error(errorText);
    }
  };

  return (
    <Modal onClose={onClose} show={show} modalTitle={modalTitle}>
      {showingInputs.map(({
        path, placeholder, label, onClick, inputType, showPassWord,
      }) => (
        <Fragment key={path}>
          <Input
            className={classes.input_wrapper}
            classNameLabel={classes.label}
            inputClassName={classes.input}
            showPassWord={showPassWord}
            onClick={onClick || (() => {})}
            type={inputType || ''}
            onChange={(v) => changingValues(path, v)}
            placeholder={placeholder}
            label={label}
            value={allValues[path]}
            error={!!errors[path]}
          />
        </Fragment>
      ))}

      <label className={classes.textarea_label}>
        <p className={classes.textarea_text}>Комментарий:</p>
        <textarea
          className={classes.textarea}
          placeholder="Комментарий"
          value={allValues.description}
          style={{ border: errors?.comments ? '1px solid red' : '' }}
          onChange={({ target }) => changingValues('comments', target.value)}
        />
      </label>

      <div className={classes.colors_block}>
        <p className={classes.colors_text}>Цвет папки:</p>

        {colors.map(({
          color,
          id,
        }) => (
          <div
            key={id}
            className={`${classes.color} ${errors?.passwordColor ? classes.error : ''}`}
            style={{
              backgroundColor: color,
              border: `${allValues.passwordColor === color ? '1px solid black' : ''}`,
            }}
            onClick={() => changingValues('passwordColor', color)}
          />
        ))}
      </div>

      <div className={classes.buttons_block}>
        <Button
          onClick={saveAllFields}
          className={classes.save_button}
        >
          Сохранить
        </Button>

        <Button
          onClick={() => {
          }}
          className={classes.cancel_button}
        >
          Отменить
        </Button>
      </div>
    </Modal>
  );
};
CreateUpdatePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  fields: PropTypes.object,
};

CreateUpdatePassword.defaultProps = {
  fields: {},
};
export default CreateUpdatePassword;
