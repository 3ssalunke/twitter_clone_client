import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: rgb(29, 155, 240);
  align-self: center;
  width: 100%;
  height: 52px;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
`;
// @ts-ignore
export default function AuthButton({ text, onClick }) {
  return <Button onClick={onClick}>{text}</Button>;
}
