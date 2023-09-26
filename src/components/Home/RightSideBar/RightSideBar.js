import React from 'react';
import Input from '../../_common/Form/Input/Input';
import { ReactComponent as AccessSvg } from '../../../assets/icons/buttons/AccessSvg.svg';
import { ReactComponent as HistorySvg } from '../../../assets/icons/buttons/HistorySvg.svg';
import { ReactComponent as ChangeSvg } from '../../../assets/icons/buttons/ChangeSvg.svg';
import { ReactComponent as LinkSvg } from '../../../assets/icons/buttons/Link_Break.svg';
import classes from './rightSideBar.module.scss';
import Button from '../../_common/Form/Button/Button';

const RightSideBar = () => {
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
  console.log(2222);
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <p className={classes.header_text}>dfdddf</p>
      </div>

      <div className={classes.main_content}>
        <Input
          className={classes.input_wrapper}
          classNameLabel={classes.label}
          inputClassName={classes.input}
          onChange={() => {}}
          placeholder="Название"
          label="Название"
          value=""
          disabled
        />

        <label className={classes.textarea_label}>
          <p className={classes.textarea_text}>Описание:</p>
          <textarea
            className={classes.textarea}
            placeholder="Описание"
            value=""
          />
        </label>

        <div className={classes.buttons_block}>
          {buttons.map(({ name, Icon }) => (
            <Button
              onClick={() => {}}
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
    </div>
  );
};

export default RightSideBar;
