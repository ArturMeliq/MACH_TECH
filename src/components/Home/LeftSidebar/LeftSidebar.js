import React, { useCallback, useState } from 'react';
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
import photo2 from '../../../assets/photos/photo_2.png';
import photo3 from '../../../assets/photos/photo_3.png';
import photo4 from '../../../assets/photos/photo_4.png';
import photo5 from '../../../assets/photos/photo_5.png';
import classes from './leftSidebar.module.scss';
import Input from '../../_common/Form/Input/Input';
// import HistoryPopUp from './HistoryPopUp/HistoryPopUp';
import AccessesPopUp from './AccessesPopUp/AccessesPopUp';
import SettingsPopUp from './SettingsPopUp/SettingsPopUp';

const LeftSidebar = () => {
  const [showSearch, setSowSearch] = useState(false);
  // const [showHistory, setShowHistory] = useState(false);
  const [showAccesses, setShowAccesses] = useState(false);
  const [showSettings, ToggleSettings] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showingSearch = () => {
    setSowSearch((prev) => !prev);
  };
  const handleChange = (val) => {
    setInputValue(val);
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
  // // const data = useMemo(() => [
  // //   {
  // //     id: 1,
  // //     fullName: 'Фамилия Имя Отчество',
  // //     photo: photo1,
  // //     accessRights: 'Редактор',
  // //     history: 'История',
  // //     date: '13.07.2023, в 14:03',
  // //   },
  // //   {
  // //     id: 2,
  // //     fullName: 'Фамилия Имя Отчество',
  // //     photo: photo1,
  // //     accessRights: 'Читатель',
  // //     history: 'История',
  // //     date: '13.07.2023, в 14:03',
  // //   },
  // //
  // // ], []);

  const accessData = [
    {
      id: 1,
      photo: photo2,
      fullName: 'Фамилия Имя Отчество 1',
    },
    {
      id: 2,
      photo: photo3,
      fullName: 'Фамилия Имя Отчество 2',
    },
    {
      id: 3,
      photo: photo4,
      fullName: 'Фамилия Имя Отчество 3',
    },
    {
      id: 4,
      photo: photo5,
      fullName: 'Фамилия Имя Отчество 4',
    },
  ];

  return (
    <div className={classes.left_sideBar}>
      <div style={{ width: '100%' }}>
        <div className={classes.options}>
          {!showSearch
            ? (
              <div className={classes.showing_icons}>
                <div className={classes.folder_icon}>
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
              <form onSubmit={(e) => e.preventDefault()}>
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
      </div>

      <div className={classes.logo_block}>
        <LogoSvg />
      </div>

      {/* <HistoryPopUp */}
      {/*   data={data} */}
      {/*   headerData={headerData} */}
      {/*   showingHistory={showingHistory} */}
      {/*   showHistory={showHistory} */}
      {/* /> */}

      <AccessesPopUp
        accessData={accessData}
        showAccesses={showAccesses}
        showingAccesses={showingAccesses}
      />

      <SettingsPopUp
        showSettings={showSettings}
        showingSettings={showingSettings}
      />
    </div>
  );
};

export default LeftSidebar;
