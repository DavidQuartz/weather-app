import { createContext, useReducer } from 'react';
import appReducer from './reducers/appReducer';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, {
    openSearchDrawer: false,
  });

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
