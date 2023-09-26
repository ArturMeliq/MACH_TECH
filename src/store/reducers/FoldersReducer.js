import { ReactComponent as FolderSvg1 } from '../../assets/icons/folders/FolderSvg1.svg';
import { CREATE_FOLDER_SUCCESS, DELETE_FOLDER_SUCCESS } from '../actions/Folders';

const initialState = [
  {
    id: 1,
    name: 'Инстаграм_1',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 1,
    id: 2,
    name: 'Инстаграм_1_1',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 2,
    id: 3,
    name: 'Инстаграм_1_1_1',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 3,
    id: 4,
    name: 'Инстаграм',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },

  {
    id: 5,
    name: 'Инстаграм',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 5,
    id: 6,
    name: 'Инстаграм',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 6,
    id: 7,
    name: 'Инстаграм',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
  {
    parentId: 7,
    id: 8,
    name: 'Инстаграм',
    section: 'Инстаграм',
    colorFolder: '#FFCA28',
    IconFolder: FolderSvg1,
    description: '',
  },
];

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FOLDER_SUCCESS: {
      return [
        ...state,
        {
          ...action.payload,
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
