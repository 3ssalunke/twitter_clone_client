import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import User from './pages/User';
import Main from './pages/Main';

function App() {
  // @ts-ignore
  const [, authDispatch] = useAuthContext();
  const [loading, setLoading] = useState(true);

  const sessionLogin = useCallback(async () => {
    try {
      const response = await axios.post('/auth/token-refresh');
      console.log('토큰 로그인 결과', response.data);
      authDispatch({ type: 'LOGIN', payload: response.data });
      setTimeout(() => {
        setLoading(false);
      }, 100);
      return;
    } catch (error) {
      // console.log('세션로그인 에러', error);
      setLoading(false);
      return;
    }
  }, [authDispatch]);

  useEffect(() => {
    sessionLogin();
  }, [sessionLogin]);
  // // 임시
  // useEffect(() => {
  //   authDispatch({
  //     type: 'LOGIN',
  //     payload: {
  //       name: '테스트이름',
  //       user_id: 'testID',
  //       country: 'KR',
  //       follower: [],
  //       following: ['NASA'],
  //       header: null,
  //       photo: {
  //         key: 'uvAOVS9p.jpg',
  //         url: 'https://twitterclonetest.s3.ap-northeast-2.amazonaws.com/uvAOVS9p.jpg',
  //       },
  //       description: '',
  //     },
  //   });
  //   console.log('임시 로그인');
  //   setLoading(false);
  // }, [authDispatch]);

  // if (loading) return <></>;

  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/home" component={Home} exact />
      <Route path="/status/:user" component={User} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/join" component={Join} exact />
    </Switch>
  );
}

export default App;
