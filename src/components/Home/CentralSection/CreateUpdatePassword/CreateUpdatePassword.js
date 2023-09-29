import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Modal from '../../../_common/Modal/Modal';
import Input from '../../../_common/Form/Input/Input';
import classes from './createUpdatePassword.module.scss';
import colors from '../../../../helpers/staticData/Colors/colors';
import Button from '../../../_common/Form/Button/Button';
import { addPassword } from '../../../../store/actions/passwords';

const passwordByComplexity = [
  {
    pattern: /(?=.*?[A-Z])/,
    errorText: 'Нужно хотя бы одна заглавная',
    text: 'Плохой пароль',
  },
  {
    pattern: /(?=.*?[0-9])/,
    errorText: 'Нужно хоть одна цифра',
    text: 'Слабый пароль',
  },
  {
    pattern: /.{8,}/,
    errorText: 'Минимум восемь в длину',
    text: 'Хороший пароль',
  },
];

const CreateUpdatePassword = ({
  fields,
  onClose,
  show,
  modalTitle,
}) => {
  const folderId = useSelector((state) => state.folderPasswordId.folderId);
  const passwords = useSelector((state) => state.passwords);
  const dispatch = useDispatch();
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
  const [passwordByComplexityText, setPasswordByComplexityText] = useState('');

  const passwordByComplexityClasses = [classes.what_is_password];

  if (passwordByComplexityText === 'Ненадежный пароль') passwordByComplexityClasses.push(classes.unreliable);
  if (passwordByComplexityText === 'Слабый пароль')passwordByComplexityClasses.push(classes.weak);
  if (passwordByComplexityText === 'Хороший пароль') passwordByComplexityClasses.push(classes.good);

  const showingInputs = useMemo(() => [
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
  ], [type]);

  const changingValues = useCallback((path, v) => {
    if ((path === 'password')) {
      if ((/(?=.*?[A-Z])/.test(v))) {
        setPasswordByComplexityText('Ненадежный пароль');
      }
      if ((/(?=.*?[A-Z])(?=.*?[0-9])/.test(v) && !(/.{8,}/.test(v)))) {
        setPasswordByComplexityText('Слабый пароль');
      }
      if ((/(?=.*?[A-Z])(?=.*?[0-9]).{8,}/.test(v))) {
        setPasswordByComplexityText('Хороший пароль');
      }
    }
    setAllValues((prevState) => ({
      ...prevState,
      [path]: v,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [path]: false,
    }));
  }, [allValues, errors, passwordByComplexityText]);

  function showingPassword(path) {
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
  }

  const saveAllFields = () => {
    let errorText = '';

    _.forEach(allValues, (value, key) => {
      if (key !== 'id' && key !== 'folderId') {
        if (!value.trim()) {
          errorText = 'Все поля обязательны';

          setErrors((prevState) => ({
            ...prevState,
            [key]: 'Все поля обязательны',
          }));
        } else if (((key === 'name' || key === 'login') && value.length < 4)) {
          errorText = 'Требуемая длина минимум 3 символа';
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'Требуемая длина минимум 3 символа',
          }));
        } else if (key === 'password') {
          if (allValues.password !== allValues.repeatPassword) {
            errorText = 'Пароль не совпадает';
            setErrors((prevState) => ({
              ...prevState,
              repeatPassword: 'Пароль не совпадает',
            }));
          }
          passwordByComplexity.forEach((p) => {
            if (!p.pattern.test(value)) {
              errorText = p.errorText;
              setErrors((prevState) => ({
                ...prevState,
                password: errorText,
                repeatPassword: errorText,
              }));
            }
          });
        } else if ((key === 'comments') && value.length > 1200) {
          errorText = 'Требуемая длина максимум 1200 символа';

          setErrors((prevState) => ({
            ...prevState,
            password: 'Требуемая длина максимум 1200 символа',
          }));
        }
      }
    });

    if (!errorText) {
      const item = _.find(passwords, (f) => f.id === fields?.id);
      if (item) {
        dispatch(addPassword({
          ...allValues,
          folderId,
        }));
      } else {
        dispatch(addPassword({
          ...allValues,
          folderId,
          id: _.max(passwords.map(({ id }) => id)) + 1,
        }));
      }

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

  const generatePassword = () => {
    const lowerCasedAlphabets = [...'abcdefghijklmnopqrstuvwxyz'.split('')];
    const upperCasedAlphabets = lowerCasedAlphabets.map((alphabet) => alphabet.toUpperCase());
    const numbers = [...'1234567890'.split('')
      .map((num) => +num)];
    const symbols = [...'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')];

    const passSymbols = [...lowerCasedAlphabets, ...upperCasedAlphabets, ...numbers, symbols];
    let newPass = '';

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      const randomNumber = Math.floor(Math.random() * passSymbols.length);

      newPass += passSymbols[randomNumber];
    }
    changingValues('password', newPass);
    changingValues('repeatPassword', newPass);
  };

  return (
    <Modal
      onClose={() => {
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
      }}
      show={show}
      modalTitle={modalTitle}
    >
      <div className={classes.password_wrapper}>
        {showingInputs.map(({
          path,
          placeholder,
          label,
          onClick,
          inputType,
          showPassWord,
        }, index) => (
          <div key={path} style={{ order: index }}>
            <Input
              key={path}
              className={classes.input_wrapper}
              classNameLabel={classes.label}
              inputClassName={classes.input}
              showPassWord={showPassWord}
              onClick={onClick}
              type={inputType}
              onChange={(v) => changingValues(path, v)}
              placeholder={placeholder}
              label={label}
              value={allValues[path]}
              error={!!errors[path]}
            />
          </div>
        ))}

        <div style={{ order: 3 }} className={classes.generate_password_block}>
          <p className={classes.generate_password_block_text}>
            Сложность:
          </p>

          <div className={classes.generate_password_content}>
            <div className={passwordByComplexityClasses.join(' ')}>
              {passwordByComplexityText}
            </div>

            <Button
              className={classes.generate_password_button}
              onClick={generatePassword}
            >
              Придумать пароль
            </Button>
          </div>
        </div>

        <label style={{ order: 5 }} className={classes.textarea_label}>
          <p className={classes.textarea_text}>Комментарий:</p>
          <textarea
            className={classes.textarea}
            placeholder="Комментарий"
            value={allValues.comments}
            style={{ border: errors?.comments ? '1px solid red' : '' }}
            onChange={({ target }) => changingValues('comments', target.value)}
          />
        </label>

        <div style={{ order: 6 }} className={classes.colors_block}>
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

        <div style={{ order: 7 }} className={classes.buttons_block}>
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
