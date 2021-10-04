import React from 'react';
import styled from 'styled-components';
import { ITweet } from '../../types';
import SmallTweet from './SmallTweet';

const Container = styled.div`
  position: relative;
  width: 100%;
  border-left: 1px solid rgb(239, 243, 244);
  border-right: 1px solid rgb(239, 243, 244);
`;

interface ITweetList {
  data: ITweet[];
  user_id: string;
  isLogin: boolean;
  onChangeTimeLine?: any;
}
//@ts-ignore {/* @ts-ignore */}
export default function TweetList({
  data,
  user_id,
  isLogin,
  onChangeTimeLine,
}: ITweetList) {
  if (!data) return <Container></Container>;
  return (
    <Container>
      {data.map((value, idx) => (
        <div key={idx}>
          <SmallTweet
            value={value}
            user_id={user_id}
            isLogin={isLogin}
            onChangeTimeLine={onChangeTimeLine}
          />
        </div>
      ))}
    </Container>
  );
}
