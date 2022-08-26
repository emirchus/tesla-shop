import { FC, PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from '.';

export interface UiState {
  isMenuOpen: boolean;
}

const Ui_InitialState: UiState = {
  isMenuOpen: false
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, Ui_InitialState);

  const toggleSideMenu = (status: boolean) => {
    dispatch({ type: 'toggle_menu', payload: status });
  };

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
