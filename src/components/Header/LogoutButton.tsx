import React, { useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../../context/AuthContext';

const Button = styled.button`
  background-color: rgb(29, 155, 240);
  align-self: center;
  width: 91px;
  height: 30px;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
`;

export default function LogoutButton() {
  const history = useHistory();
  // @ts-ignore
  const [, authDispatch] = useAuthContext();

  const onStartLogout = useCallback(async () => {
    try {
      const response = await axios.post('/auth/logout');
      console.log('로그아웃 결과', response.data);
      authDispatch({ type: 'LOGOUT' });
      history.push('/login');
      return;
    } catch (error) {
      console.log('에러', error);
      return;
    }
  }, [authDispatch, history]);

  return (
    <Button onClick={onStartLogout}>
      <span>로그아웃</span>
    </Button>
  );
}
