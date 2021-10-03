import React, { createContext, useReducer, useContext } from 'react';
import { IMedia } from '../types';

interface IUserProps {
  isLogin: boolean;
  user: {
    user_id: string;
    name: string;
    // join_date: string;
    follower: string[];
    following: string[];
    profile_color: string;
    description: string;
  };
}
const initialState: IUserProps = {
  isLogin: false,
  user: {
    user_id: '',
    name: '',
    follower: [],
    following: [],
    profile_color: '#17517e',
    description: '',
  },
};

export const AuthContext = createContext(initialState);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext 없음.');
  return context;
}

// @ts-ignore
const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        isLogin: true,
        user: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        isLogin: false,
        user: {
          user_id: '',
          name: '',
          follower: [],
          following: [],
          profile_color: '#17517e',
          description: '',
        },
      };
    }
    default: {
      console.log('context 에러');
      return prevState;
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactChild }) {
  const [store, authDispath] = useReducer(authReducer, initialState);
  return (
    // @ts-ignore
    <AuthContext.Provider value={[store, authDispath]}>
      {children}
    </AuthContext.Provider>
  );
}
