import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import logo from '../../assets/Logo blue.svg';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';

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

export default function Join() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);
  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const inputPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );
  const onSubmit = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <WrapperDiv>
        <LogoSvg src={logo} />
        <form>
          <AuthInput
            placeholder="아이디를 입력하세요"
            value={userId}
            type="text"
            onChange={inputUserId}
          />
          <AuthInput
            placeholder="이메일를 입력하세요"
            value={email}
            type="text"
            onChange={inputEmail}
          />
          <AuthInput
            placeholder="비밀번호를 입력하세요"
            value={password}
            type="password"
            onChange={inputPassword}
          />
          <AuthButton text="회원가입" onClick={onSubmit} />
        </form>
      </WrapperDiv>
    </Container>
  );
}
