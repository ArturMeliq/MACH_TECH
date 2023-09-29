import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { ReactComponent as ArrowDownSvg } from '../../../assets/icons/ArrowDownSvg.svg';
import { ReactComponent as StarSvg } from '../../../assets/icons/StarSvg.svg';
import { ReactComponent as DotsSvg } from '../../../assets/icons/DotsSvg.svg';
import { ReactComponent as PlusSvg } from '../../../assets/icons/PlusSvg.svg';
import Settings from '../Settings/Settings';
import classes from './centralSection.module.scss';
import CreateUpdatePassword from './CreateUpdatePassword/CreateUpdatePassword';
import DeleteModal from '../DeleteModal/DeleteModal';
import { deletePassword, setFavoritesRequest } from '../../../store/actions/passwords';
import { savePasswordId } from '../../../store/actions/saveFolderAndPasswordId';

const headerData = [
  {
    title: 'Название',
    path: 'name',
    Icon: ArrowDownSvg,
    iconWidth: 14,
    iconHeight: 15,
    minWidth: 462,
  },
  {
    title: 'URL',
    path: 'url',
    minWidth: 404,
  },
  {
    title: '',
    path: '',
    Icon: StarSvg,
    favorites: true,
    iconWidth: 23,
    iconHeight: 22,
    width: 120,
  },
];
const CentralSection = () => {
  const [currentPasswordId, setCurrentPasswordId] = useState();
  const [currentSettingsId, setCurrentSettingsId] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [sortedData, toggleSortedData] = useState(true);
  const [showAddPasswordModal, setShowingAddPasswordModal] = useState(false);
  const [isAllFavorite, setAllFavorites] = useState(false);
  const [isItemFavorite, setItemFavorites] = useState(false);
  const { passwords } = useSelector((state) => state);
  const folderPasswordId = useSelector((state) => state.folderPasswordId);
  const {
    folderId,
    passwordId,
  } = folderPasswordId;
  const dispatch = useDispatch();

  useEffect(() => {
    const allFavorites = _.filter(passwords, (p) => p.favorites);
    if ((allFavorites.length > 0) && (passwords.length === allFavorites.length)) {
      setAllFavorites(true);
    } else {
      setAllFavorites(false);
    }
  }, [isItemFavorite]);
  const changingPasswordId = (id) => {
    dispatch(savePasswordId(id));
    setCurrentPasswordId(id);
  };
  const handleSettingsId = useCallback((id) => {
    setCurrentSettingsId(id);
  }, [currentSettingsId]);

  const showingSetting = (i) => {
    setShowSettings(i);
    togglePasswordModal();
  };

  const changeFavorites = useCallback((e, id) => {
    e.stopPropagation();
    if (id) {
      dispatch(setFavoritesRequest({ id }));
      setItemFavorites((prev) => !prev);
    } else {
      dispatch(setFavoritesRequest({ isAllFavorite: !isAllFavorite }));
      setAllFavorites((prev) => !prev);
    }
  }, [isAllFavorite, isItemFavorite]);

  const filteredData = sortedData
    ? passwords.filter((d) => folderId === d.folderId)
      .sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      })
    : passwords.filter((d) => folderId === d.folderId)
      .sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        return 0;
      });

  const togglePasswordModal = useCallback(() => {
    setShowingAddPasswordModal((prevState) => !prevState);
  }, []);

  const deletingPassword = () => {
    dispatch(deletePassword(!passwordId));
    dispatch(savePasswordId(''));
    togglePasswordModal();
  };

  return (
    <section className={classes.passwords_wrapper}>
      {folderId && (
        <div>
          <table>
            <thead onClick={() => toggleSortedData((prevState) => !prevState)}>

              <tr>
                {headerData.map(({
                  title,
                  Icon,
                  path,
                  width,
                  minWidth,
                  maxWidth,
                  iconWidth,
                  iconHeight,
                  favorites,
                }) => (
                  <th
                    key={title}
                    style={
                    {
                      width: width || 'auto',
                      minWidth: minWidth || 'auto',
                      maxWidth: maxWidth || 'auto',
                    }
                  }
                  >
                    <div className={`${classes.header_block} ${Icon && !title ? classes.padding : ''}`}>
                      {title && (
                      <p className={classes.header_text}>
                        {title}
                      </p>
                      )}

                      {Icon && (
                      <div
                        className={`${classes.header_icon}
                       ${favorites ? classes.star : ''} ${isAllFavorite ? classes.active : ''}`}
                        onClick={favorites ? changeFavorites : () => {
                        }}
                        style={{
                          width: iconWidth || 'auto',
                          height: iconHeight || 'auto',
                          transform: (path === 'name' && !sortedData) ? 'rotate(180deg)' : '',
                        }}
                      >
                        <Icon />
                      </div>
                      )}
                    </div>

                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {(filteredData.length > 0) && filteredData.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => changingPasswordId(d.id)}
                  className={passwordId === d.id ? classes.active : ''}
                >
                  {headerData.filter(({ path }) => path)
                    .map((
                      {
                        title,
                        width,
                        path,
                        minWidth,
                        maxWidth,
                      },
                    ) => (
                      <td
                        key={title}
                        style={
                        {
                          width: width || 'auto',
                          minWidth: minWidth || 'auto',
                          maxWidth: maxWidth || 'auto',
                        }
                      }
                      >
                        {path === 'name'
                          ? (
                            <div className={classes.name_block}>
                              <div className={classes.name_block_first_later}>
                                {d[path][0].toUpperCase()}
                              </div>
                              <p>{d[path]}</p>
                            </div>
                          )
                          : <p>{d[path]}</p>}
                      </td>
                    ))}

                  <td>
                    <div className={classes.settings}>
                      <div className={classes.dots_Svg_block}>
                        <div
                          className={classes.settings_icon}
                          onClick={(event) => {
                            event.stopPropagation();
                            changingPasswordId(d.id);
                            setShowSettings((prevState) => !prevState);
                          }}
                        >
                          <DotsSvg />
                        </div>

                        {(showSettings && currentPasswordId === d.id) && (
                        <Settings
                          showingSetting={showingSetting}
                          onClick={handleSettingsId}
                        />
                        )}

                      </div>

                      <div
                        className={`${classes.item_star} ${d?.favorites ? classes.favorites : ''}`}
                        onClick={(e) => changeFavorites(e, d.id)}
                      >
                        <StarSvg />
                      </div>
                    </div>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>

          {(!filteredData.length)
            && (
              <div
                className={classes.add_password_button}
                onClick={togglePasswordModal}
              >
                <div className={classes.add_password_svg}>
                  <PlusSvg />
                </div>

                <p className={classes.add_password_text}>Добавить пароль</p>
              </div>
            )}
          {showAddPasswordModal && (
          <CreateUpdatePassword
            onClose={togglePasswordModal}
            modalTitle="Добавить пароль"
            show={showAddPasswordModal}
          />
          )}

        </div>
      )}

      {(currentSettingsId === 1) && (
        <DeleteModal
          onClose={togglePasswordModal}
          text="Вы уверены что хотите удалить этот пароль?"
          show={showAddPasswordModal}
          onConfirm={deletingPassword}
        />
      )}

    </section>
  );
};

export default CentralSection;
