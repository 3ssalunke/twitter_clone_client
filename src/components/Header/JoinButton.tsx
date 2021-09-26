import React, { useCallback } from 'react';
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

export default function JoinButton() {
  const history = useHistory();
  // @ts-ignore
  const [, authDispatch] = useAuthContext();

  const moveToPage = useCallback(() => {
    return history.push('/join');
  }, [history]);

  return (
    <Button onClick={moveToPage}>
      <span>회원가입</span>
    </Button>
  );
}
