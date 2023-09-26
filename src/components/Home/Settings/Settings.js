import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './settings.module.scss';

const settingsFolder = [
  {
    id: 1,
    text: 'Удалить папку',
  },
  {
    id: 2,
    text: 'Добавить подраздел',
  },
  {
    id: 3,
    text: 'Добавить пароль',
  },
  {
    id: 4,
    text: 'Добавить в избранное',
  },
];

const Settings = ({ showingSetting, onClick }) => {
  useEffect(() => {
    window.addEventListener('click', closeOptions, false);

    return () => {
      window.removeEventListener('click', closeOptions, false);
    };
  }, []);

  const closeOptions = () => {
    showingSetting(false);
  };

  return (
    <div
      className={classes.settings_folder}
    >

      <div className={classes.settings_arrow}>
        <div className={classes.settings_arrow_rotate} />
      </div>

      <div className={classes.settings_folder_content}>
        {settingsFolder.map(({
          id,
          text,
        }) => (
          <p
            key={id}
            className={classes.settings_folder_content_text}
            onClick={() => {
              onClick(id);
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

Settings.propTypes = {
  showingSetting: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Settings;
