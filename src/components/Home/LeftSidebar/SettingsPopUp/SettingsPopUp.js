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
  const [idFields, setIdFields] = useState('');

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
      id: 1,
      fullName: 'Имя Фамилия',
    },
    {
      id: 2,
      fullName: 'Имя Фамилия',
    },
    {
      id: 3,
      fullName: 'Имя Фамилия',
    },
    {
      id: 4,
      fullName: 'Имя Фамилия',
    },
    {
      id: 5,
      fullName: 'Имя Фамилия',
    },
    {
      id: 6,
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

        {fields.map(({ field, id }) => (!idFields || idFields >= id ? (
          <p
            key={field}
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
        ) : ''))}
        <div
          className={classes.show_options}
          style={{
            display:
              hovering === 'Отредактировать права на корневую папку'
              || hovering === 'Забирать права' ? 'block' : 'none',
          }}
        >
          <AddingUsersAndChangingPermissions className={classes.margin}>
            {addUsers.map(({
              fullName,
              id,
            }) => (
              <div key={id} className={classes.change_users}>
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
      </div>

    </Modal>
  );
};
SettingsPopUp.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  showingSettings: PropTypes.func.isRequired,
};
export default SettingsPopUp;
