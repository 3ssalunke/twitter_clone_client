import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/Logo blue.svg';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import EditProfile from '../../components/Buttons/EditProfile';

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
  width: 25%;
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
  const [profileColor, setProfileColor] = useState('#17517e');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUserId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value);
    },
    []
  );
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );
  const onChangeColor = useCallback((color: string) => {
    setProfileColor(color);
  }, []);

  const onSubmit = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        await axios.post('/users', {
          email,
          password,
          name,
          user_id: userId,
          profile_color: profileColor,
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
    [email, history, name, password, profileColor, userId]
  );

  return (
    <Container>
      <WrapperDiv>
        <LogoSvg src={logo} />
        <form>
          <EditProfile color={profileColor} onChangeColor={onChangeColor} />
          <AuthInput
            placeholder="아이디를 입력하세요"
            value={userId}
            type="text"
            onChange={onChangeUserId}
          />
          <AuthInput
            placeholder="이름을 입력하세요"
            value={name}
            type="text"
            onChange={onChangeName}
          />
          <AuthInput
            placeholder="이메일를 입력하세요"
            value={email}
            type="text"
            onChange={onChangeEmail}
          />
          <AuthInput
            placeholder="비밀번호를 입력하세요"
            value={password}
            type="password"
            onChange={onChangePassword}
          />
          <AuthButton text="회원가입" onClick={onSubmit} />
        </form>
      </WrapperDiv>
    </Container>
  );
}
