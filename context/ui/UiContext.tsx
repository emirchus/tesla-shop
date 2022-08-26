import { createContext } from 'react';

interface UiContextProps {
  isMenuOpen: boolean;
  toggleSideMenu: (status: boolean) => void;
}

export const UiContext = createContext<UiContextProps>({} as UiContextProps);
