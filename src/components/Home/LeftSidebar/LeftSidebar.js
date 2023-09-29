import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchSvg } from '../../../assets/icons/SearchSvg.svg';
import { ReactComponent as KeySvg } from '../../../assets/icons/KeySvg.svg';
import { ReactComponent as FolderSvg } from '../../../assets/icons/FolderSvg.svg';
import { ReactComponent as SettingsSvg } from '../../../assets/icons/SettingsSvg.svg';
import { ReactComponent as LogoSvg } from '../../../assets/icons/LogoSvg.svg';
import classes from './leftSidebar.module.scss';
import Input from '../../_common/Form/Input/Input';
import AccessesPopUp from './AccessesPopUp/AccessesPopUp';
import SettingsPopUp from './SettingsPopUp/SettingsPopUp';
import CreateUpdateFolderPopUp from './CreateUpdateFolderPopUp/CreateUpdateFolderPopUp';
import RenderFolder from './RenderFolder/RenderFolder';
import { deleteFolder } from '../../../store/actions/folders';
import { saveFolderId } from '../../../store/actions/saveFolderAndPasswordId';
import DeleteModal from '../DeleteModal/DeleteModal';
import CreateUpdatePassword from '../CentralSection/CreateUpdatePassword/CreateUpdatePassword';

const headerFolders = [
  {
    id: 1,
    Icon: FolderSvg,
    className: classes.folder_icon,
  },
  {
    id: 2,
    Icon: KeySvg,
    className: classes.key_icon,
  },
  {
    id: 3,
    Icon: SettingsSvg,
    className: classes.settings_icon,
  },
];

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const folders = useSelector((state) => state.folders);
  const folderPasswordId = useSelector((state) => state.folderPasswordId);
  const { folderId } = folderPasswordId;

  const [showSearch, setSowSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentHeaderFolderId, setCurrentHeaderFolderId] = useState();
  const [currentSettingsId, setCurrentSettingsId] = useState();
  const [showModals, toggleModals] = useState(false);

  const showingHeaderModals = useCallback((id) => {
    setCurrentHeaderFolderId(id);
    toggleModals((prev) => !prev);
  }, [currentHeaderFolderId]);

  const handleSettingId = useCallback((id) => {
    setCurrentSettingsId(id);
    toggleModals((prev) => !prev);
  }, [currentSettingsId]);

  const showingSearch = useCallback(() => {
    setInputValue('');
    setSowSearch((prev) => !prev);
  }, []);

  const handleChange = useCallback((val) => {
    setInputValue(val);
  }, [inputValue]);

  const deletedFolder = () => {
    dispatch(deleteFolder(folderId));
    dispatch(saveFolderId(''));
  };

  return (
    <div className={classes.left_sideBar}>
      <div className={classes.options}>
        {!showSearch
          ? (
            <div className={classes.showing_icons}>
              {headerFolders.map(({ id, Icon, className }) => (
                <div
                  key={id}
                  className={className}
                  onClick={() => showingHeaderModals(id)}
                >
                  <Icon />
                </div>
              ))}

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
      {currentHeaderFolderId === 1
        && (
          <CreateUpdateFolderPopUp
            showCreatingFolder={showModals}
            onClose={showingHeaderModals}
            title="Создать папку"
          />
        )}

      {currentHeaderFolderId === 2
        && (
        <AccessesPopUp
          accessData={users}
          showAccesses={showModals}
          showingAccesses={showingHeaderModals}
        />
        )}
      {currentHeaderFolderId === 3
        && (
          <SettingsPopUp
            showSettings={showModals}
            showingSettings={showingHeaderModals}
          />
        )}

      {(currentSettingsId === 1) && (
        <DeleteModal
          onClose={handleSettingId}
          text="Вы уверены что хотите удалить эту папку?"
          show={showModals}
          onConfirm={deletedFolder}
        />
      )}

      {(currentSettingsId === 2)
        && (
          <CreateUpdateFolderPopUp
            onClose={handleSettingId}
            fields={{
              parentId: folderId,
              section: folders.find((f) => f.id === folderId)?.name,
            }}
            showCreatingFolder={showModals}
            title="Добавить подраздел"
          />
        )}

      {(currentSettingsId === 3)
        && (
          <CreateUpdatePassword
            onClose={handleSettingId}
            fields={{
              parentId: folderId,
            }}
            show={showModals}
            modalTitle="Добавить пароль"
          />
        )}
    </div>
  );
};

export default LeftSidebar;
