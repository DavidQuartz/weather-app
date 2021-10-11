import * as Actions from '../actions/appActions';

const appReducer = (state, action) => {
  switch (action.type) {
    case Actions.OPEN_SEARCH_DRAWER:
      return {
        ...state,
        openSearchDrawer: true,
      };

    case Actions.CLOSE_SEARCH_DRAWER:
      return {
        ...state,
        openSearchDrawer: false,
      };

    default:
      return state;
  }
};

export default appReducer;
