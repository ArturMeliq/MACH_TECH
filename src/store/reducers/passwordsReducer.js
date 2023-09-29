import { CREATE_PASSWORD_SUCCESS, DELETE_PASSWORD_SUCCESS, SET_FAVORITES_SUCCESS } from '../actions/passwords';

const initialState = [
  {
    folderId: 1,
    id: 1,
    name: 'Instagram 1',
    login: 'login',
    password: 'password',
    repeatPassword: 'password',
    url: 'https://www.site.com',
    comments: 'sdasdas',
    passwordColor: '#FFCA28',
    favorites: true,
  },
  {
    folderId: 1,
    id: 2,
    name: 'Instagram 2',
    login: 'login',
    password: 'password',
    repeatPassword: 'password',
    url: 'https://www.site.com',
    comments: 'sdasdas',
    passwordColor: '#FFCA28',
    favorites: false,
  },
  {
    folderId: 1,
    id: 3,
    name: 'Instagram 3',
    login: 'login',
    password: 'password',
    repeatPassword: 'password',
    url: 'https://www.site.com',
    comments: 'sdasdas',
    passwordColor: '#FFCA28',
    favorites: false,
  },
];

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PASSWORD_SUCCESS: {
      const findItem = state.find((f) => f.id === action.payload.password.id);
      if (findItem) {
        const {
          folderId, id, name, login, password, repeatPassword, url, comments, passwordColor,
        } = action.payload.password;
        return [
          ...state.map((p) => {
            if (p.id === action.payload.password.id) {
              return {
                folderId,
                id,
                name,
                login,
                password,
                repeatPassword,
                url,
                comments,
                passwordColor,
              };
            }
            return p;
          }),
        ];
      }
      return [
        ...state,
        {
          ...action.payload.password,
        },
      ];
    }
    case DELETE_PASSWORD_SUCCESS: {
      return [
        ...state.filter(({ id }) => id !== action.payload.id),
      ];
    }
    case SET_FAVORITES_SUCCESS: {
      const { isAllFavorite, id } = action.payload;

      if (id) {
        return [
          ...state.map((p) => {
            if (p.id === id) {
              return {
                ...p,
                favorites: !p.favorites,
              };
            }

            return p;
          }),
        ];
      }
      return [
        ...state.map((p) => ({
          ...p,
          favorites: isAllFavorite,
        })),
      ];
    }

    default: {
      return state;
    }
  }
}
