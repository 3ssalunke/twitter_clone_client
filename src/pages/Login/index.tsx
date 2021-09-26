import React, { useState, useCallback, useEffect } from 'react';
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

export default function Login() {
  const [email, seEmail] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      authDispatch({
        type: 'LOGIN',
        payload: {
          name: '테스트이름',
          user_id: 'testID',
          country: 'KR',
          follower: [],
          following: ['NASA'],
          header: null,
          photo: {
            key: '0ZxKlEKB.jpg',
            url: 'https://twitterclonetest.s3.ap-northeast-2.amazonaws.com/0ZxKlEKB.jpg',
          },
          description: '',
        },
      });
    },
    [authDispatch]
  );

  useEffect(() => {
    console.log('로그인 후: ', authStore);
  }, [authStore]);

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
        </form>
      </WrapperDiv>
    </Container>
  );
}
