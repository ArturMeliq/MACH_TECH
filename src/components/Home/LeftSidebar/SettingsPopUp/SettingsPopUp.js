import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../_common/Modal/Modal';
import classes from './settingsPopUp.module.scss';
import AddingUsersAndChangingPermissions
  from '../../AddingUsersAndChangingPermissions/AddingUsersAndChangingPermissions';
import Checkbox from '../../../_common/Form/Checkbox/Checkbox';
import MySelectComponent from '../../../_common/Form/MySelectComponent/MySelectComponent';
import Button from '../../../_common/Form/Button/Button';
import { ReactComponent as PlusSvg } from '../../../../assets/icons/PlusSvg.svg';

const SettingsPopUp = ({
  showSettings,
  showingSettings,
}) => {
  const [hovering, setHovering] = useState(0);
  const [, setIdFields] = useState('');

  const fields = [
    {
      id: 1,
      field: 'Импорт паролей',
    },
    {
      id: 2,
      field: 'Экспорт данных в .CSV',
    },
    {
      id: 3,
      field: 'Получить отчет действий пользователей',
    },
    {
      id: 4,
      field: 'Отредактировать права на корневую папку',
    },
    {
      id: 5,
      field: 'Забирать права',
    },
  ];

  const addUsers = [
    {
      userId: 1,
      fullName: 'Имя Фамилия',
    },
    {
      userId: 2,
      fullName: 'Имя Фамилия',
    },
    {
      userId: 3,
      fullName: 'Имя Фамилия',
    },
    {
      userId: 4,
      fullName: 'Имя Фамилия',
    },
    {
      userId: 5,
      fullName: 'Имя Фамилия',
    },
    {
      userId: 6,
      fullName: 'Имя Фамилия',
    },
  ];

  return (
    <Modal
      classNameContent={classes.for_settings_content}
      classNameWrapper={classes.for_settings_wrapper}
      className={classes.for_setting_modal}
      show={showSettings}
      onClose={showingSettings}
      modalTitle="Настройки"
    >
      <div
        className={classes.settings_wrapper}
        onMouseLeave={() => {
          setHovering('');
          setIdFields('');
        }}
      >

        {fields.map(({ field, id }) => (
          <div
            key={field}
            className={classes.fields_options}
          >
            <p
              className={classes.field}
              onMouseEnter={({ target }) => {
                setHovering(target.textContent);
                setIdFields(id);
              }}
              onMouseLeave={() => {
              }}
            >
              {field}
            </p>

            {((field === 'Отредактировать права на корневую папку'
                  && hovering === 'Отредактировать права на корневую папку')
                || (field === 'Забирать права' && hovering === 'Забирать права'))
              && (
                <div
                  className={classes.show_options}
                >
                  <AddingUsersAndChangingPermissions className={classes.margin}>
                    {addUsers.map(({
                      fullName,
                      userId,
                    }) => (
                      <div key={userId} className={classes.change_users}>
                        <Checkbox SVG={PlusSvg} text={fullName} />

                        <MySelectComponent
                          className={classes.for_select_design}
                          classNameText={classes.for_select_text_size}
                          value="Права"
                        />
                      </div>
                    ))}
                  </AddingUsersAndChangingPermissions>

                  <div className={classes.btns_block}>
                    <Button
                      className={classes.save}
                      onClick={() => {
                      }}
                    >
                      Сохранить
                    </Button>

                    <Button
                      className={classes.cancel_btn}
                      onClick={() => {
                      }}
                    >
                      Отменить
                    </Button>
                  </div>
                </div>
              )}

          </div>

        ))}

      </div>

    </Modal>
  );
};
SettingsPopUp.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  showingSettings: PropTypes.func.isRequired,
};
export default SettingsPopUp;
