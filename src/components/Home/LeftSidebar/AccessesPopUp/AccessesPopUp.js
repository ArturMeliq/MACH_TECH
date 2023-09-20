import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../_common/Modal/Modal';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/DeleteSvg.svg';
import { ReactComponent as PlusSvg } from '../../../../assets/icons/PlusSvg.svg';
import MySelectComponent from '../../../_common/Form/MySelectComponent/MySelectComponent';
import Button from '../../../_common/Form/Button/Button';
import AddingUsersAndChangingPermissions
  from '../../AddingUsersAndChangingPermissions/AddingUsersAndChangingPermissions';
import Checkbox from '../../../_common/Form/Checkbox/Checkbox';
import classes from './accessesPopUp.module.scss';

const options = ['Редактирование', 'Чтение'];

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
  }, {
    id: 6,
    fullName: 'Имя Фамилия',
  },
];
const AccessesPopUp = ({
  accessData,
  showAccesses,
  showingAccesses,
}) => {
  const users = [];
  const [usersOptions, setUsersOptions] = useState(users);
  const [addingUsers, setAdding] = useState(false);

  const handleChange = (v, id) => {
    setUsersOptions(
      (prevState) => prevState.map((value) => {
        if (+value.id === +id) {
          value.option = v;
          return value;
        }
        return value;
      }),
    );
  };

  const closeAddingUsers = () => {
    setAdding(false);
  };

  return (
    <Modal
      modalTitle="Доступ"
      onClose={showingAccesses}
      show={showAccesses}
    >
      {accessData.map(({
        id,
        photo,
        fullName,
      }) => {
        users.push({
          id,
        });

        return (
          <div key={id} className={classes.items}>
            <div className={classes.photo_block}>
              <img src={photo} alt="photo" />
            </div>

            <p className={classes.ful_name}>{fullName}</p>

            <MySelectComponent
              value={usersOptions.find((v) => v.id === id)?.option}
              options={options}
              onChange={(v) => handleChange(v, id)}
            />

            <div style={{ minWidth: 55 }}>
              <DeleteSvg className={classes.delete_svg} />
            </div>

          </div>
        );
      })}

      {!addingUsers
        ? (
          <Button onClick={() => setAdding(true)} className={classes.margin_btn}>
            Добавить пользователя
          </Button>
        )
        : (
          <>
            <AddingUsersAndChangingPermissions
              title="Добавление новых пользователей"
              onClose={closeAddingUsers}
            >
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

            <Button className={classes.save} onClick={closeAddingUsers}>
              Сохранить
            </Button>

            <Button className={classes.cancel_btn} onClick={closeAddingUsers}>
              Отменить
            </Button>
          </>
        )}

    </Modal>
  );
};
AccessesPopUp.propTypes = {
  accessData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    photo: PropTypes.any.isRequired,
    fullName: PropTypes.string.isRequired,
  })).isRequired,
  showAccesses: PropTypes.bool.isRequired,
  showingAccesses: PropTypes.func.isRequired,
};
export default AccessesPopUp;
