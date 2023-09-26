import { CREATE_PASSWORD_SUCCESS, DELETE_PASSWORD_SUCCESS } from '../actions/Passwords';

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
    passwordColor: 'red',
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
    passwordColor: 'red',
  },
];

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PASSWORD_SUCCESS: {
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

    default: {
      return state;
    }
  }
}
