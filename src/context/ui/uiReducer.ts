import { UiState } from '.';

type UiActionType = {
  type: 'toggle_menu';
  payload: boolean;
};

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case 'toggle_menu': {
      return {
        ...state,
        isMenuOpen: action.payload
      };
    }
    default:
      return state;
  }
};
