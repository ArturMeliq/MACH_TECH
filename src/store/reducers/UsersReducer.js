import photo1 from '../../assets/photos/photo_2.png';
import photo2 from '../../assets/photos/photo_3.png';
import photo3 from '../../assets/photos/photo_4.png';
import photo4 from '../../assets/photos/photo_5.png';

const initialState = [
  {
    id: 1,
    fullName: 'Фамилия Имя Отчество',
    photo: photo1,
    accessRights: 'Редактор',
    history: 'История',
    date: '13.07.2023, в 14:03',
  },
  {
    id: 2,
    fullName: 'Фамилия Имя Отчество',
    photo: photo2,
    accessRights: 'Редактор',
    history: 'История',
    date: '13.07.2023, в 14:03',
  },
  {
    id: 3,
    fullName: 'Фамилия Имя Отчество',
    photo: photo3,
    accessRights: 'Редактор',
    history: 'История',
    date: '13.07.2023, в 14:03',
  },
  {
    id: 4,
    fullName: 'Фамилия Имя Отчество',
    photo: photo4,
    accessRights: 'Редактор',
    history: 'История',
    date: '13.07.2023, в 14:03',
  },
];

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'x': {
      return {
        ...state,
        id: action.payload.CategoryId,
      };
    }

    default: {
      return state;
    }
  }
}
