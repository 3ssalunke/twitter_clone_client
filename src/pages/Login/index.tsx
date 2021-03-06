import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/Logo blue.svg';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { useAuthContext } from '../../context/AuthContext';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 5%;
`;
const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  width: 30%;
  box-sizing: border-box;
  padding: 50px 10px;
  margin: 0 auto;
`;
const LogoSvg = styled.img`
  width: 80px;
  margin-bottom: 50px;
`;
const JoinWrapper = styled.div`
  margin-top: 10px;
  span {
    cursor: pointer;
    color: #1a0dab;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Login() {
  const history = useHistory();
  const [email, seEmail] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();
  const [loading, setLoading] = useState(true);

  const onChangeUserId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      seEmail(e.target.value);
    },
    []
  );
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );
  const onSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post('/auth/login', { email, password });
        // console.log('response', response.data);
        authDispatch({ type: 'LOGIN', payload: response.data });

        return history.push('/home');
      } catch (error: any) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response.data);
        return;
      }
    },
    [authDispatch, email, history, password]
  );

  const moveToJoin = useCallback(() => {
    history.push('/join');
  }, [history]);

  useEffect(() => {
    if (authStore?.isLogin) {
      history.push('/home');
    } else {
      setLoading(false);
    }
  }, [authStore, history]);

  if (loading) return <></>;

  return (
    <Container>
      <WrapperDiv>
        <LogoSvg src={logo} />
        <form>
          <AuthInput
            placeholder="???????????? ???????????????"
            value={email}
            type="text"
            onChange={onChangeUserId}
          />
          <AuthInput
            placeholder="??????????????? ???????????????"
            value={password}
            type="password"
            onChange={onChangePassword}
          />
          <AuthButton text="?????????" onClick={onSubmit} />
          <JoinWrapper>
            <span onClick={moveToJoin}>???????????? ???????????????? ??????????????????</span>
          </JoinWrapper>
        </form>
      </WrapperDiv>
    </Container>
  );
}
