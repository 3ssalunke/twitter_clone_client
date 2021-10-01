import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export default function Main() {
  const history = useHistory();
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();

  useEffect(() => {
    if (authStore.isLogin) {
      history.push('/home');
    } else {
      history.push('/login');
    }
  }, [authStore, history]);
  return <></>;
}
