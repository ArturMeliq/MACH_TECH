import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as ShowMoreSvg } from '../../../../assets/icons/ShowMoreSvg.svg';
import { ReactComponent as DotsSvg } from '../../../../assets/icons/DotsSvg.svg';
import classes from './renderFolder.module.scss';
import Settings from '../../Settings/Settings';
import { saveFolderId, savePasswordId } from '../../../../store/actions/saveFolderAndPasswordId';

const RenderFolder = ({
  inputValue,
  onClick,
  handleSettingId,
}) => {
  const folders = useSelector((state) => state.folders);
  const folderPasswordId = useSelector((state) => state.folderPasswordId);
  const dispatch = useDispatch();
  const [folderList, setFolderList] = useState(folders);
  const [showingFolderId, setShowingFolderId] = useState([]);
  const [showSettingsFolder, setShowSettingFolder] = useState(false);
  const [currentId, setCurrentId] = useState();

  const { folderId } = folderPasswordId;

  useEffect(() => {
    if (inputValue.trim()) {
      const findIds = [];
      const parents = [];

      folders.forEach((p) => {
        if (p.name.toLowerCase().includes(inputValue.trim().toLowerCase())) {
          findIds.push(p.id);
          getFolderParents(p.id, parents);
        }
      });

      setFolderList(folders.filter((f) => [...findIds, ...parents].includes(f.id)));
      setShowingFolderId(parents);
    } else {
      setFolderList(folders);
      setShowingFolderId([]);
    }
  }, [inputValue, folders]);

  const getFolderParents = (fId, parentIds = []) => {
    folders.forEach(({ id, parentId }) => {
      if (id === fId && parentId && !parentIds.includes(parentId)) {
        parentIds.push(parentId);
        getFolderParents(parentId, parentIds);
      }
    });
  };

  const showingSubFolder = (parenId) => {
    const { name } = folders.find((f) => f.id === parenId);

    setShowingFolderId((prev) => {
      if (prev.includes(parenId)) {
        return prev.filter((p) => p !== parenId);
      }

      return [...prev, parenId];
    });

    setCurrentId(parenId);
    dispatch(saveFolderId(parenId));
    dispatch(savePasswordId(''));
    onClick(parenId, name);
  };

  const renderFolder = (idParent) => (
    folderList.filter((folder) => folder.parentId === idParent)
      .map(({
        id,
        IconFolder,
        colorFolder,
        name,
        parentId,
      }) => {
        const hasChild = folderList.find((f) => f.parentId === id);

        return (

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
              ${(currentId === id)
                || (folderId === id)
                || (inputValue.trim() && name.toLowerCase() === inputValue.trim().toLowerCase())
                  ? classes.active : ''}`}
                onClick={() => {
                  showingSubFolder(id);
                }}
              >

                {hasChild
                  && (
                    <ShowMoreSvg
                      className={classes.show_more_svg}
                      style={{ transform: showingFolderId.includes(id) && 'rotate(180deg)' }}
                    />
                  ) }

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

        );
      })
  );

  return (
    <div style={{ width: '100%' }}>
      {(!renderFolder().length && folders.length)
        ? <p className={classes.nothing_found_text}>Ничего не найдено</p>
        : renderFolder()}
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
