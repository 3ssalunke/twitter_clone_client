import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ITweet } from '../../types';
import ProfileImage from '../ProfileImage';
import Comment from '../Buttons/Comment';
import Retweet from '../Buttons/Retweet';
import Heart from '../Buttons/Heart';
import Share from '../Buttons/Share';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100px;
  z-index: 0;
  cursor: pointer;
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
const UserName = styled.span`
  color: black;
  font-weight: bold;
`;
const UserId = styled.span`
  color: rgb(83, 100, 113);
`;
const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 70px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;

interface ISmallTweetProps {
  value: ITweet;
  user_id: string;
  isLogin: boolean;
  onChangeTimeLine?: any;
}

//@ts-ignore
export default function SmallTweet({
  value,
  user_id,
  isLogin,
  onChangeTimeLine,
}: ISmallTweetProps) {
  const history = useHistory();
  const moveToDetailPage = useCallback(() => {
    history.push(`/${value.user_id}/status/${value.tweet_id}`);
    return;
  }, [history, value]);
  return (
    <Container onClick={moveToDetailPage}>
      <Wrapper>
        {/* // @ts-ignore */}
        <ProfileImage
          size="small"
          color={value.user.profile_color}
          user_id={value.user.user_id}
        />
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
      <ButtonWrapper>
        <Comment comments={value.comments} showCount={true} />
        <Retweet
          retweet={value.retweet}
          user_id={user_id}
          isLogin={isLogin}
          showCount={true}
          tweet_id={value.tweet_id}
          onChangeTimeLine={onChangeTimeLine}
        />
        <Heart
          like={value.like}
          user_id={user_id}
          isLogin={isLogin}
          showCount={true}
          tweet_id={value.tweet_id}
          onChangeTimeLine={onChangeTimeLine}
        />
        <Share />
      </ButtonWrapper>
    </Container>
  );
}
