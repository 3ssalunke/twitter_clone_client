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

  const inputUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    seEmail(e.target.value);
  }, []);
  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );
  const onSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        // const response = await axios.post('/auth/login', {
        //   email: 'test@g.com',
        //   password: '123',
        // });
        const response = await axios.post('/auth/login', { email, password });
        console.log('response', response.data);
        authDispatch({ type: 'LOGIN', payload: response.data });

        return history.push('/home');
      } catch (error) {
        console.log('에러', error);
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
            placeholder="이메일를 입력하세요"
            value={email}
            type="text"
            onChange={inputUserId}
          />
          <AuthInput
            placeholder="비밀번호를 입력하세요"
            value={password}
            type="password"
            onChange={inputPassword}
          />
          <AuthButton text="로그인" onClick={onSubmit} />
          <JoinWrapper>
            <span onClick={moveToJoin}>아이디가 없으신가요? 회원가입하기</span>
          </JoinWrapper>
        </form>
      </WrapperDiv>
    </Container>
  );
}
