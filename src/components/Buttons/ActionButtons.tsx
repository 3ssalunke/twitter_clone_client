import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import Heart from './Heart';
import Retweet from './Retweet';
import Share from './Share';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 70px;
`;
interface IActionButtonProps {
  comments: string[];
  retweet: string[];
  like: string[];
  user_id: string;
  isLogin: boolean;
}
export default function ActionButtons({
  comments,
  retweet,
  like,
  user_id,
  isLogin,
}: IActionButtonProps) {
  return (
    <Container>
      <Comment comments={comments} />
      <Retweet retweet={retweet} user_id={user_id} isLogin={isLogin} />
      <Heart like={like} user_id={user_id} isLogin={isLogin} />
      <Share />
    </Container>
  );
}
