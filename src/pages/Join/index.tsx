import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputUserId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);
  const inputName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
  const onSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        await axios.post('/auth/join', {
          email,
          password,
          name,
          user_id: userId,
        });
        alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        history.push('/login');
        return;
      } catch (error: any) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.response.data);
        return;
      }
    },
    [email, history, name, password, userId]
  );

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
            placeholder="이름을 입력하세요"
            value={name}
            type="text"
            onChange={inputName}
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
