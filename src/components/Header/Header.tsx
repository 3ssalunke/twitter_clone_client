import React from 'react';
import styled from 'styled-components';
import JoinButton from './JoinButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
`;

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <Container>
      {isLogin ? (
        <LogoutButton />
      ) : (
        <>
          <>
            <LoginButton />
          </>
          <div style={{ marginLeft: 5 }}>
            <JoinButton />
          </div>
        </>
      )}
    </Container>
  );
}
