import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../actions/actionType';

const INITIAL_STATE = {
  postData: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return state;
    case CREATE:
      return { ...state, postData: action.payload };
    default:
      return state;
  }
};

export default postReducer;
