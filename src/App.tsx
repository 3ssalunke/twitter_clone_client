import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import User from './pages/User';
import Main from './pages/Main';
import Tweet from './pages/Tweet';

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
      setLoading(false);
      return;
    }
  }, [authDispatch]);

  useEffect(() => {
    sessionLogin();
  }, [sessionLogin]);

  if (loading) return <></>;

  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/home" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/join" component={Join} exact />
      <Route path="/:user" component={User} exact />
      <Route path="/:user/status/:tweetid" component={Tweet} exact />
    </Switch>
  );
}

export default App;
