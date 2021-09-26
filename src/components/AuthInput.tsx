import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 43px;
  box-sizing: border-box;
  margin-bottom: 12px;
  border-radius: 3px;
  padding-left: 16px;
  font-size: 14px;
`;
// @ts-ignore
export default function AuthInput({ value, placeholder, type, onChange }) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
}
