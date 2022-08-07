import {
  LOADING,
  RESULT_ERROR,
  SET_RESULT,
  SET_FILTER,
  RESULT_SHOW,
  SET_SEARCHWORD,
} from "../types";
const { combineReducers } = require("redux");

const initalState = {
  loading: false,
  searchword: "",
  filterby: "",
  result: {},
  show: 1,
  error: "",
};

const queryReducers = (state = initalState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, result: {}, loading: true, show: 1 };
    case SET_SEARCHWORD:
      return { ...state, searchword: action.payload, error: "" };
    case SET_FILTER:
      return { ...state, filterby: action.payload, error: "" };
    case SET_RESULT:
      return { ...state, loading: false, result: action.payload };
    case RESULT_ERROR:
      return { ...state, loading: false, result: {}, error: "true" };
    case RESULT_SHOW:
      return { ...state, show: state.show < 20 ? state.show + 1 : state.show };
    default:
      return state;
  }
};

const reducers = combineReducers({
  data: queryReducers,
});

export default reducers;
