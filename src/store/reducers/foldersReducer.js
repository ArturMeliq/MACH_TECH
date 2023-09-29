import { ReactComponent as FolderSvg1 } from '../../assets/icons/folders/FolderSvg1.svg';
import { CREATE_FOLDER_SUCCESS, DELETE_FOLDER_SUCCESS } from '../actions/folders';

const initialState = [
  {
    id: 1,
    name: 'Инстаграм',
    section: '',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: 'GGGGGGGGGGG',
  },
  {
    parentId: 1,
    id: 2,
    name: 'Инстаграм_1',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 2,
    id: 3,
    name: 'Инстаграм_1_1',
    section: 'Инстаграм_1',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 3,
    id: 4,
    name: 'Инстаграм_1_1_1',
    section: 'Инстаграм_1_1',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },

  {
    id: 5,
    name: 'Фейсбук',
    section: '',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 5,
    id: 6,
    name: 'Фейсбук_2',
    section: 'Фейсбук',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 6,
    id: 7,
    name: 'Фейсбук_3',
    section: 'Фейсбук_2',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 7,
    id: 8,
    name: 'Фейсбук_4',
    section: 'Фейсбук_3',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
];

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FOLDER_SUCCESS: {
      const findItem = state.find((f) => f.id === action.payload.folder.id);
      if (findItem) {
        const {
          id, name, section, colorFolder, IconFolder, description, parentId,
        } = action.payload.folder;
        return [
          ...state.map((f) => {
            if (f.id === findItem.id) {
              return ({
                ...f,
                id,
                parentId,
                name,
                section,
                colorFolder,
                IconFolder,
                description,
              });
            }
            return f;
          }),

        ];
      }
      return [
        ...state,
        {
          ...action.payload.folder,
          section: action.payload.folder.name,
        },
      ];
    }

    case DELETE_FOLDER_SUCCESS: {
      return [
        ...state.filter(({ id }) => id !== action.payload.id),
      ];
    }

    default: {
      return state;
    }
  }
}
