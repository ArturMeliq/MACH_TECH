import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as ShowMoreSvg } from '../../../assets/icons/ShowMoreSvg.svg';
import { ReactComponent as DotsSvg } from '../../../assets/icons/DotsSvg.svg';
import classes from './renderFolder.module.scss';
import Settings from '../../Home/Settings/Settings';
import { saveFolderId, savePasswordId } from '../../../store/actions/SaveFolderAndPasswordId';

const RenderFolder = ({
  inputValue,
  onClick,
  handleSettingId,
}) => {
  const [showingFolderId, setShowingFolderId] = useState([]);
  const [showSettingsFolder, setShowSettingFolder] = useState(false);

  const [currentId, setCurrentId] = useState();
  const { folders, folderPasswordId: { folderId } } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getFolderChildrenId = (pId) => {
    const list = [];

    folders.forEach(({
      parentId,
      id,
    }) => {
      if (parentId === pId) list.push(id);
    });

    return list;
  };

  const showingSubFolder = (parenId) => {
    let newFolderId = [...showingFolderId];

    const i = showingFolderId.indexOf(parenId);

    if (i > -1) {
      getFolderChildrenId(parenId)
        .forEach((id) => {
          newFolderId = newFolderId.filter((v) => v !== id);
        });

      newFolderId.splice(i, 1);
    } else {
      getFolderChildrenId(parenId)
        .forEach((id) => {
          folders.forEach((f) => {
            if (f.id === id) newFolderId.push(parenId);
          });
        });
    }

    const parentFolder = folders.find(({ id }) => id === parenId);

    setShowingFolderId([...newFolderId]);
    setCurrentId(parenId);
    dispatch(saveFolderId(parenId));
    dispatch(savePasswordId(''));
    onClick(parentFolder.id, parentFolder.name);
  };

  const renderFolder = (idParent) => (
    folders.filter((folder) => folder.parentId === idParent)
      .filter((folder) => folder.name.toUpperCase()
        .includes(inputValue.toUpperCase()))
      .map(({
        id,
        IconFolder,
        colorFolder,
        name,
        parentId,
      }) => (

        <ul
          className={classes.folders_wrapper}
          key={id}
        >
          <li
            className={classes.list}
            style={{ marginLeft: parentId && 10 }}
          >
            <div
              className={`${classes.list_items} 
              ${(currentId === id) || (folderId === id) ? classes.active : ''}`}
              onClick={() => {
                showingSubFolder(id);
              }}
            >

              {getFolderChildrenId(id).length
                ? (
                  <ShowMoreSvg
                    className={classes.show_more_svg}
                    style={{ transform: showingFolderId.includes(id) && 'rotate(180deg)' }}
                  />
                ) : ''}

              <div className={classes.folder_icon}>
                <IconFolder fill={colorFolder} />
              </div>

              <p className={classes.folder_name}>
                {name}
              </p>

              <div className={classes.dots_svg_block}>

                <div
                  className={classes.dots_svg}
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentId(id);
                    setShowSettingFolder((prevState) => !prevState);
                  }}
                >
                  <DotsSvg />
                </div>

                {(showSettingsFolder && currentId === id) && (
                <Settings
                  onClick={handleSettingId}
                  showingSetting={setShowSettingFolder}
                />
                )}

              </div>

            </div>
            {showingFolderId.includes(id) && renderFolder(id)}
          </li>
        </ul>

      ))
  );

  return (
    <div style={{ width: '100%' }}>
      {renderFolder().length ? renderFolder()
        : <p className={classes.nothing_found_text}>Ничего не найдено</p>}
    </div>

  );
};

RenderFolder.propTypes = {
  inputValue: PropTypes.string,
  onClick: PropTypes.func,
  handleSettingId: PropTypes.func,
};

RenderFolder.defaultProps = {
  inputValue: '',
  onClick: () => {
  },
  handleSettingId: () => {
  },
};

export default RenderFolder;
