import React, { useCallback, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import User from './pages/User';

function App() {
  // @ts-ignore
  // const [authStore, authDispatch] = useAuthContext();

  return (
    <AuthProvider>
      <Switch>
        <Route path="/status/:user" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Route path="/" component={Home} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
