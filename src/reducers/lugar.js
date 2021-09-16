const initialState = null;

const lugar = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LUGAR":
      return {
        ...state,
        ...action.lugar
      };
    default:
      return state;
  }
}

export default lugar;
