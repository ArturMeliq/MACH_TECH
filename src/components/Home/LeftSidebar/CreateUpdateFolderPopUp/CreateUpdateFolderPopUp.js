import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../_common/Modal/Modal';
import Input from '../../../_common/Form/Input/Input';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/xmark-solid.svg';
import Button from '../../../_common/Form/Button/Button';
import RenderFolder from '../RenderFolder/RenderFolder';
import colors from '../../../../helpers/staticData/Colors/colors';
import folders from '../../../../helpers/staticData/Folder/folder';
import { addFolder } from '../../../../store/actions/folders';
import classes from './createUpdateFolderPopUp.module.scss';

const CreateUpdateFolderPopUp = ({
  onClose,
  showCreatingFolder,
  title,
  fields,
}) => {
  const foldersOfStore = useSelector((states) => states.folders);
  const folderId = useSelector((states) => states.folderPasswordId.folderId);
  const dispatch = useDispatch();
  const [searchFolderValue, setSearchFolderValue] = useState('');

  const [showChapter, toggleChapter] = useState(false);

  const [allValues, setAllValues] = useState({
    id: fields?.id || '',
    parentId: fields?.parentId || undefined,
    name: fields?.name || '',
    section: fields?.section || '',
    description: fields?.description || '',
    colorFolder: fields?.colorFolder || '',
    IconFolder: fields?.IconFolder || '',
  });

  const [errors, setErrors] = useState({});

  const showingChapter = () => {
    toggleChapter((prevState) => !prevState);
  };

  const changingValues = (path, v) => {
    setAllValues((prevState) => ({
      ...prevState,
      [path]: v,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [path]: false,
    }));
  };

  const onClickFolder = useCallback((parentId, name) => {
    setAllValues((prevState) => ({
      ...prevState,
      parentId,
      section: name,
    }));
  }, [setAllValues, folderId]);

  const selectSection = useCallback(() => {
    setAllValues((prevState) => ({
      ...prevState,
      parentId: fields.id,
    }));

    setErrors((prevState) => ({
      ...prevState,
      section: false,
    }));

    toggleChapter(false);
  }, [allValues, errors, showChapter]);

  const searchingFolder = useCallback((v) => {
    setSearchFolderValue(v);
  }, [searchFolderValue]);

  const saveAllFields = () => {
    let errorText = '';
    const checkedValue = { ...allValues };
    if (!allValues.section) {
      checkedValue.parentId = undefined;
    }

    _.forEach(checkedValue, (value, key) => {
      const isValueEmpty = typeof value === 'string' ? !value.trim() : !value;

      if (key !== 'id' && key !== 'parentId' && key !== 'section') {
        if (isValueEmpty) {
          errorText = 'Все поля обязательны';
          setErrors((prevState) => ({
            ...prevState,
            [key]: true,
          }));
        }
      }
    });

    if (!errorText) {
      const item = _.find(foldersOfStore, (f) => f.id === fields?.id);
      if (item) {
        dispatch(addFolder(checkedValue));
      } else {
        dispatch(addFolder({
          ...checkedValue,
          id: _.max(foldersOfStore.map(({ id }) => id)) + 1,
        }));
      }

      toast.success('Успешно создано');
      setAllValues({
        id: '',
        parentId: '',
        name: '',
        section: '',
        description: '',
        colorFolder: '',
        IconFolder: '',
      });
      onClose();
    } else {
      toast.error(errorText);
    }
  };
  const cancelingSaveFolder = () => {
    setAllValues({
      id: '',
      parentId: '',
      name: '',
      section: '',
      description: '',
      colorFolder: '',
      IconFolder: '',
    });
    setErrors({});
    onClose();
  };
  return (
    <Modal
      onClose={() => {
        setErrors({});
        setAllValues({
          id: '',
          parentId: '',
          name: '',
          section: '',
          description: '',
          colorFolder: '',
          IconFolder: '',
        });
        onClose();
      }}
      show={showCreatingFolder}
      modalTitle={title}
    >
      <Input
        className={classes.name}
        classNameLabel={classes.label}
        inputClassName={classes.input}
        onChange={(val) => changingValues('name', val)}
        value={allValues.name}
        placeholder="Название"
        label="Название:"
        error={errors.name}
      />

      <div className={classes.chapter_wrapper}>
        <Input
          thereIsFolderBtn
          className={classes.name}
          classNameLabel={classes.label}
          inputClassName={classes.input}
          onChange={(val) => changingValues('section', val)}
          value={allValues.section}
          placeholder="Раздел"
          label="Раздел:"
          error={errors.section}
          onClick={showingChapter}
        />

        {showChapter && (
          <div className={classes.options}>
            <div className={classes.header}>

              <p className={classes.header_text}>Выбрать раздел</p>

              <div
                className={classes.close_svg}
                onClick={showingChapter}
              >
                <CloseSvg />
              </div>
            </div>

            <div className={classes.content}>
              <div style={{
                height: 32,
                width: '100%',
              }}
              >
                <Input
                  inputClassName={classes.content_input}
                  thereIsSearchBtn
                  onChange={searchingFolder}
                  value={searchFolderValue}
                />
              </div>

              <div className={classes.folders_main_block}>
                <RenderFolder
                  inputValue={searchFolderValue}
                  onClick={onClickFolder}
                  currentFolderId={allValues?.parentId}
                />
              </div>

              <div className={classes.options_buttons_block}>
                <Button
                  onClick={selectSection}
                  className={classes.options_save_button}
                >
                  Выбрать
                </Button>

                <Button
                  onClick={showingChapter}
                  className={classes.options_cancel_button}
                >
                  Отменить
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>

      <label className={classes.textarea_label}>
        <p className={classes.textarea_text}>Описание:</p>
        <textarea
          className={classes.textarea}
          placeholder="Описание"
          value={allValues.description}
          style={{ border: errors?.description ? '1px solid red' : '' }}
          onChange={({ target }) => changingValues('description', target.value)}
        />
      </label>

      <div className={classes.colors_block}>
        <p className={classes.colors_text}>Цвет папки:</p>

        {colors.map(({
          color,
          id,
        }) => (
          <div
            key={id}
            className={`${classes.color} ${errors.colorFolder ? classes.error : ''}`}
            style={{
              backgroundColor: color,
              border: `${allValues.colorFolder === color ? '1px solid black' : ''}`,
            }}
            onClick={() => changingValues('colorFolder', color)}
          />
        ))}
      </div>

      <div className={classes.folders_block}>
        <p className={classes.folders_text}>Иконка папки:</p>
        {folders.map(({
          id,
          Folder,
        }) => (
          <div
            key={id}
            className={`${classes.folder} ${errors.IconFolder ? classes.error : ''}`}
            onClick={() => changingValues('IconFolder', Folder)}
            style={{
              border: `${allValues.IconFolder === Folder ? '1px solid black' : ''}`,
            }}
          >
            <Folder />
          </div>
        ))}
      </div>

      <div className={classes.buttons_block}>
        <Button
          onClick={saveAllFields}
          className={classes.save_button}
        >
          Сохранить
        </Button>

        <Button
          onClick={cancelingSaveFolder}
          className={classes.cancel_button}
        >
          Отменить
        </Button>
      </div>
    </Modal>
  );
};

CreateUpdateFolderPopUp.propTypes = {
  showCreatingFolder: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.object,
};

CreateUpdateFolderPopUp.defaultProps = {
  fields: {},
};
export default CreateUpdateFolderPopUp;
