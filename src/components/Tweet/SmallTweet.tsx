import React, { useEffect } from 'react';
import styled from 'styled-components';
import ISmallTweet from '../../types/ISmallTweet';
import ProfileImage from '../ProfileImage';
import ActionButtons from '../Buttons/ActionButtons';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100px;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 16px;
  border-top: 1px solid rgb(239, 243, 244);
  border-bottom: 1px solid rgb(239, 243, 244);
`;

const ContentsArea = styled.div`
  position: relative;
  margin-left: 10px;
`;
const UserName = styled.a`
  color: black;
  text-decoration: none;
  font-weight: bold;
`;
const UserId = styled.span`
  color: rgb(83, 100, 113);
`;

interface ISmallTweetProps {
  value: ISmallTweet;
  user_id: string;
  isLogin: boolean;
}

//@ts-ignore
export default function SmallTweet({
  value,
  user_id,
  isLogin,
}: ISmallTweetProps) {
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <Container>
      <Wrapper>
        {/* // @ts-ignore */}
        <ProfileImage size="small" imagePath={value.user.photo.url} />
        <ContentsArea>
          <div
            className="user_name"
            style={{ display: 'inline-block', marginRight: 3 }}
          >
            <UserName>{value.user.name}</UserName>
          </div>
          <div className="user_id" style={{ display: 'inline-block' }}>
            <UserId>{`@${value.user.user_id}`}</UserId>
          </div>
          <div className="contents" style={{ marginTop: 5 }}>
            <span>{value.contents}</span>
          </div>
        </ContentsArea>
      </Wrapper>
      <ActionButtons
        comments={value.comments}
        retweet={value.retweet}
        like={value.like}
        user_id={user_id}
        isLogin={isLogin}
      />
    </Container>
  );
}
