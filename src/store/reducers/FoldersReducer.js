const initialState = [
  {
    id: 1,
    name: '',
    section: '',
    colorFolder: '',
    IconFolder: '',
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
