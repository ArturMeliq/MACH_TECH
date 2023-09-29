import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Input from '../../_common/Form/Input/Input';
import { ReactComponent as AccessSvg } from '../../../assets/icons/buttons/AccessSvg.svg';
import { ReactComponent as HistorySvg } from '../../../assets/icons/buttons/HistorySvg.svg';
import { ReactComponent as ChangeSvg } from '../../../assets/icons/buttons/ChangeSvg.svg';
import { ReactComponent as LinkSvg } from '../../../assets/icons/buttons/Link_Break.svg';
import { ReactComponent as UserSvg } from '../../../assets/icons/User_01.svg';
import { ReactComponent as AccessRightsSvg } from '../../../assets/icons/AccessRights.svg';
import { ReactComponent as History2Svg } from '../../../assets/icons/HistorySvg.svg';
import { ReactComponent as CalendarSvg } from '../../../assets/icons/CalendarSvg.svg';
import classes from './rightSideBar.module.scss';
import Button from '../../_common/Form/Button/Button';
import AccessesPopUp from '../LeftSidebar/AccessesPopUp/AccessesPopUp';
import HistoryPopUp from '../LeftSidebar/HistoryPopUp/HistoryPopUp';
import CreateUpdateFolderPopUp from '../LeftSidebar/CreateUpdateFolderPopUp/CreateUpdateFolderPopUp';
import CreateUpdatePassword from '../CentralSection/CreateUpdatePassword/CreateUpdatePassword';

const buttons = [
  {
    name: 'Доступ',
    Icon: AccessSvg,
  },
  {
    name: 'История',
    Icon: HistorySvg,
  },
  {
    name: 'Изменить',
    Icon: ChangeSvg,
  },
  {
    name: 'Ссылка',
    Icon: LinkSvg,
  },
];
const RightSideBar = () => {
  const folders = useSelector((state) => state.folders);
  const folderId = useSelector((state) => state.folderPasswordId.folderId);
  const passwords = useSelector((state) => state.passwords);
  const passwordId = useSelector((state) => state.folderPasswordId.passwordId);
  const users = useSelector((state) => state.users);
  const [currentButton, setCurrentButton] = useState('');
  const [showModals, setShowModals] = useState(false);
  const [type, setType] = useState({
    password: 'password',
    repeatPassword: 'password',
  });

  const [allValues, setAllValues] = useState({
    name: '',
    description: '',
    login: '',
    password: '',
    url: '',
    comments: '',
  });

  const findFolder = _.find(folders, (f) => f.id === folderId);
  const findPassword = _.find(passwords, (p) => p.id === passwordId);

  useEffect(() => {
    setAllValues((prev) => (
      {
        ...prev,
        name: findFolder?.name || '',
        description: findFolder?.description || '',
        login: findPassword?.login || '',
        password: findPassword?.password || '',
        url: findPassword?.url || '',
        comments: findPassword?.comments || '',
      }
    ));
  }, [findFolder, findPassword]);

  const changingValues = useCallback((path, v) => {
    setAllValues((prevState) => ({
      ...prevState,
      [path]: v,
    }));
  }, [allValues]);

  const showingPassword = useCallback((path) => {
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
  }, [type]);

  const showingInputsFolder = useMemo(() => [
    {
      path: 'name',
      placeholder: 'Название',
      label: 'Название',
      isCopyTextInput: true,
      onCopy: (e, inputRef) => copyToClipboard(e, inputRef, allValues.name),
    },

  ], [allValues]);

  const showingInputsPassWord = useMemo(() => [
    {
      path: 'login',
      placeholder: 'login',
      label: 'Логин:',
      isCopyTextInput: true,
      onCopy: (e, inputRef) => copyToClipboard(e, inputRef, allValues.login),
    },
    {
      path: 'password',
      placeholder: 'Пароль',
      label: 'Пароль:',
      onClick: () => showingPassword('password'),
      showPassWord: true,
      isCopyTextInput: true,
      inputType: type.password,
      onCopy: (e, inputRef) => copyToClipboard(e, inputRef, allValues.password),
    },
    {
      path: 'url',
      placeholder: 'url',
      label: 'URL:',
      isCopyTextInput: true,
      onCopy: (e, inputRef) => copyToClipboard(e, inputRef, allValues.url),
    },
  ], [type, allValues]);
  const userHistoryData = useMemo(() => [
    {
      title: 'Пользователь',
      Icon: UserSvg,
      path: 'fullName',
      minWidth: 271,
      photo: 'photo',
    },
    {
      title: 'Права доступа',
      Icon: AccessRightsSvg,
      path: 'accessRights',
      minWidth: 150,
    },
    {
      title: 'История',
      Icon: History2Svg,
      path: 'history',
      minWidth: 150,
    },
    {
      title: 'Дата',
      path: 'date',
      Icon: CalendarSvg,
      minWidth: 135,
    },
  ], []);

  function copyToClipboard(e, inputRef, value) {
    navigator.clipboard.writeText(value)
      .then(
        () => {
          toast.success('Copied successfully');
        },
        () => {
          toast.error('Copy failed');
        },
      );
    e.target.focus();
    inputRef.current.select();
  }

  const clickOneIsButton = useCallback((path) => {
    if (path) setCurrentButton(path);
    setShowModals((prev) => !prev);
  }, [currentButton, showModals]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <p className={classes.header_text}>
          {findFolder && !findPassword ? findFolder?.name : findPassword?.name}
        </p>
      </div>

      <div className={classes.main_content}>
        {(findFolder || findPassword)
          ? (
            <div>
              {
                findFolder && !findPassword
                  ? showingInputsFolder.map(({
                    path,
                    placeholder,
                    label,
                    onClick,
                    showPassWord,
                    isCopyTextInput,
                    inputType,
                    onCopy,
                  }) => (
                    <Input
                      key={path}
                      className={classes.input_wrapper}
                      classNameLabel={classes.label}
                      inputClassName={classes.input}
                      onChange={(v) => changingValues(path, v)}
                      placeholder={placeholder}
                      label={label}
                      showPassWord={showPassWord}
                      onClick={onClick}
                      isCopyTextInput={isCopyTextInput}
                      onCopy={onCopy}
                      type={inputType}
                      value={allValues[path]}
                    />
                  ))
                  : (
                    showingInputsPassWord.map(({
                      path,
                      placeholder,
                      label,
                      onClick,
                      showPassWord,
                      isCopyTextInput,
                      inputType,
                      onCopy,
                    }) => (
                      <Input
                        key={path}
                        className={classes.input_wrapper}
                        classNameLabel={classes.label}
                        inputClassName={classes.input}
                        onChange={(v) => changingValues(path, v)}
                        placeholder={placeholder}
                        label={label}
                        showPassWord={showPassWord}
                        onClick={onClick}
                        isCopyTextInput={isCopyTextInput}
                        onCopy={onCopy}
                        type={inputType}
                        value={allValues[path]}
                      />
                    ))
                  )
              }
              <label className={classes.textarea_label}>
                <p className={classes.textarea_text}>{findFolder && !findPassword ? 'Описание:' : 'Комментарий:'}</p>
                <textarea
                  className={classes.textarea}
                  placeholder={findFolder && !findPassword ? 'Description' : 'Comments'}
                  onChange={
                    (
                      { target },
                    ) => changingValues(findFolder && !findPassword ? 'description' : 'comments', target.value)
                  }
                  value={findFolder && !findPassword ? allValues?.description : allValues?.comments}
                />
              </label>

              <div className={classes.buttons_block}>
                {buttons.map(({
                  name,
                  Icon,
                }) => (
                  <Button
                    key={name}
                    onClick={() => clickOneIsButton(name)}
                    className={classes.one_button}
                  >
                    <div className={classes.one_button_icon}>
                      <Icon />
                    </div>

                    <p className={classes.one_button_text}>
                      {name}
                    </p>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p className={classes.nothing_here_yet}>
              Здесь пока ничего нет...
            </p>
          )}
        {showModals
          ? currentButton === 'Доступ'
            ? (
              <AccessesPopUp
                accessData={users}
                showAccesses={showModals}
                showingAccesses={clickOneIsButton}
              />
            ) : currentButton === 'История'
              ? (
                <HistoryPopUp
                  data={users}
                  headerData={userHistoryData}
                  showingHistory={clickOneIsButton}
                  showHistory={showModals}
                />
              )
              : currentButton === 'Изменить' && findFolder && !findPassword
                ? (
                  <CreateUpdateFolderPopUp
                    onClose={clickOneIsButton}
                    showCreatingFolder={showModals}
                    title="Изменить папку"
                    fields={findFolder}
                  />
                )
                : (
                  <CreateUpdatePassword
                    show={showModals}
                    onClose={clickOneIsButton}
                    fields={findPassword}
                    modalTitle="Изменить пароль"
                  />
                )
          : <div />}
      </div>
    </div>
  );
};

export default RightSideBar;
