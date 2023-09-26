import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchSvg } from '../../../assets/icons/SearchSvg.svg';
import { ReactComponent as KeySvg } from '../../../assets/icons/KeySvg.svg';
import { ReactComponent as FolderSvg } from '../../../assets/icons/FolderSvg.svg';
import { ReactComponent as SettingsSvg } from '../../../assets/icons/SettingsSvg.svg';
import { ReactComponent as LogoSvg } from '../../../assets/icons/LogoSvg.svg';
// import { ReactComponent as UserSvg } from '../../../assets/icons/User_01.svg';
// import { ReactComponent as AccessRightsSvg } from '../../../assets/icons/AccessRights.svg';
// import { ReactComponent as HistorySvg } from '../../../assets/icons/HistorySvg.svg';
// import { ReactComponent as CalendarSvg } from '../../../assets/icons/CalendarSvg.svg';
// import photo1 from '../../../assets/photos/photo_1.png';
import classes from './leftSidebar.module.scss';
import Input from '../../_common/Form/Input/Input';
// import HistoryPopUp from './HistoryPopUp/HistoryPopUp';
import AccessesPopUp from './AccessesPopUp/AccessesPopUp';
import SettingsPopUp from './SettingsPopUp/SettingsPopUp';
import CreateUpdateFolderPopUp from './CreateUpdateFolderPopUp/CreateUpdateFolderPopUp';
import RenderFolder from '../../_common/RenderFolder/RenderFolder';
import { deleteFolder } from '../../../store/actions/Folders';
import { saveFolderId } from '../../../store/actions/SaveFolderAndPasswordId';
import DeleteModal from '../DeleteModal/DeleteModal';
import CreateUpdatePassword from '../CentralSection/CreateUpdatePassword/CreateUpdatePassword';

const LeftSidebar = () => {
  const [showSearch, setSowSearch] = useState(false);
  // const [showHistory, setShowHistory] = useState(false);
  const [showAccesses, setShowAccesses] = useState(false);
  const [showSettings, ToggleSettings] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showCreatingFolder, setCreating] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [currentSettingsId, setCurrentSettingsId] = useState();

  const dispatch = useDispatch();

  const { users, folders, folderPasswordId: { folderId } } = useSelector((state) => state);

  const showingSearch = () => {
    setSowSearch((prev) => !prev);
  };
  const handleChange = (val) => {
    setInputValue(val);
  };

  const createFolder = () => {
    setCreating((prevState) => !prevState);
  };

  // const showingHistory = useCallback(() => {
  //   setShowHistory((prev) => !prev);
  // }, [showHistory]);

  const showingSettings = useCallback(() => {
    ToggleSettings((prev) => !prev);
  }, [showSettings]);

  const showingAccesses = useCallback(() => {
    setShowAccesses((prev) => !prev);
  }, [showAccesses]);
  const handleSettingId = (id) => {
    setCurrentSettingsId(id);
    toggleModal((prevState) => !prevState);
  };

  const deletedFolder = () => {
    dispatch(deleteFolder(folderId));
    dispatch(saveFolderId(''));
    toggleModal((prevState) => !prevState);
  };

  // // const headerData = useMemo(() => [
  // //   {
  // //     title: 'Пользователь',
  // //     Icon: UserSvg,
  // //     path: 'fullName',
  // //     minWidth: 271,
  // //     photo: 'photo',
  // //   },
  // //   {
  // //     title: 'Права доступа',
  // //     Icon: AccessRightsSvg,
  // //     path: 'accessRights',
  // //     minWidth: 150,
  // //   },
  // //   {
  // //     title: 'История',
  // //     Icon: HistorySvg,
  // //     path: 'history',
  // //     minWidth: 150,
  // //   },
  // //   {
  // //     title: 'Дата',
  // //     path: 'date',
  // //     Icon: CalendarSvg,
  // //     minWidth: 135,
  // //   },
  // // ], []);
  // //

  return (
    <div className={classes.left_sideBar}>
      <div className={classes.options}>
        {!showSearch
          ? (
            <div className={classes.showing_icons}>
              <div className={classes.folder_icon} onClick={createFolder}>
                <FolderSvg />
              </div>
              <div className={classes.key_icon} onClick={showingAccesses}>
                <KeySvg />
              </div>
              <div className={classes.settings_icon} onClick={showingSettings}>
                <SettingsSvg />
              </div>
            </div>
          )
          : (
            <form onSubmit={handleChange}>
              <Input
                onChange={handleChange}
                className={classes.left_sideBar_input}
                inputClassName={classes.input_padding}
                value={inputValue}
                placeholder="Поиск"
              />
            </form>

          )}

        <div
          className={classes.searchSvg_icon}
          onClick={showingSearch}
        >
          <SearchSvg />
        </div>
      </div>

      <div className={classes.folders_and_logo}>
        <RenderFolder
          inputValue={inputValue}
          handleSettingId={handleSettingId}
        />

        <div className={classes.logo_block}>
          <LogoSvg />
        </div>
      </div>

      {/* <HistoryPopUp */}
      {/*   data={data} */}
      {/*   headerData={headerData} */}
      {/*   showingHistory={showingHistory} */}
      {/*   showHistory={showHistory} */}
      {/* /> */}

      <AccessesPopUp
        accessData={users}
        showAccesses={showAccesses}
        showingAccesses={showingAccesses}
      />

      <SettingsPopUp
        showSettings={showSettings}
        showingSettings={showingSettings}
      />

      <CreateUpdateFolderPopUp
        showCreatingFolder={showCreatingFolder}
        onClose={createFolder}
        title="Создать папку"
      />

      {(currentSettingsId === 1) && (
        <DeleteModal
          onClose={() => toggleModal((prevState) => !prevState)}
          text="Вы уверены что хотите удалить эту папку?"
          show={showModal}
          onConfirm={deletedFolder}
        />
      )}

      {(currentSettingsId === 2)
        && (
          <CreateUpdateFolderPopUp
            onClose={() => {
              toggleModal((prevState) => !prevState);
            }}
            fields={{
              parentId: folderId,
              section: folders.find((f) => f.id === folderId)?.name,
            }}
            showCreatingFolder={showModal}
            title="Добавить подраздел"
          />
        )}
      {(currentSettingsId === 3)
        && (
          <CreateUpdatePassword
            onClose={() => {
              toggleModal((prevState) => !prevState);
            }}
            fields={{
              parentId: folderId,
            }}
            show={showModal}
            modalTitle="Добавить пароль"
          />
        )}
    </div>
  );
};

export default LeftSidebar;
