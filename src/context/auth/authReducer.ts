import { AuthState, UserPayload } from '.';

type AuthActionType =
  | {
      type: 'LOGIN';
      payload: UserPayload;
    }
  | {
      type: 'LOGOUT';
    };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      };
    default:
      return state;
  }
};
