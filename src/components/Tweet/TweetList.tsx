import React from 'react';
import styled from 'styled-components';
import ISmallTweet from '../../types/ISmallTweet';
import SmallTweet from './SmallTweet';

const Container = styled.div`
  position: relative;
  width: 100%;
  border-left: 1px solid rgb(239, 243, 244);
  border-right: 1px solid rgb(239, 243, 244);
`;

interface ITweetList {
  data: ISmallTweet[];
  user_id: string;
  isLogin: boolean;
}
//@ts-ignore
export default function TweetList({ data, user_id, isLogin }: ITweetList) {
  return (
    <Container>
      {/* @ts-ignore */}
      {data.map((value, idx) => (
        <div key={idx}>
          {/* @ts-ignore */}
          <SmallTweet value={value} user_id={user_id} isLogin={isLogin} />
        </div>
      ))}
    </Container>
  );
}
