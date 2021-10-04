import React, { useCallback, useEffect } from 'react';
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
  z-index: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 16px;
  border-top: 1px solid rgb(239, 243, 244);
  border-bottom: 1px solid rgb(239, 243, 244);
`;
const ProfileArea = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
`;
const UserName = styled.a`
  color: black;
  text-decoration: none;
  font-weight: bold;
`;
const UserId = styled.span`
  font-size: 0.8rem;
  color: rgb(83, 100, 113);
`;
const ContentsArea = styled.div`
  position: relative;
  .contents-div {
    font-size: 1.1rem;
    font-weight: 500;
  }
  .time-div {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

const CountsWrapper = styled.div`
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(239, 243, 244);
`;
const CountArea = styled.div`
  display: inline-block;
  .count {
    font-weight: bold;
  }
  .count-text {
    margin-left: 3px;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(239, 243, 244);
`;

interface ISmallTweetProps {
  value: ITweet;
  user_id: string;
  isLogin: boolean;
  onChangeTweet?: any;
}

//@ts-ignore
export default function DetailTweet({
  value,
  user_id,
  isLogin,
  onChangeTweet,
}: ISmallTweetProps) {
  return (
    <Container>
      <Wrapper>
        <ProfileArea>
          <ProfileImage
            size="small"
            color={value?.user?.profile_color}
            user_id={value?.user?.user_id}
          />
          <div className="name-id-field" style={{ marginLeft: 10 }}>
            <div className="user_name">
              <UserName>{value?.user?.name}</UserName>
            </div>
            <div className="user_id">
              <UserId>{`@${value?.user?.user_id}`}</UserId>
            </div>
          </div>
        </ProfileArea>

        <ContentsArea>
          <div className="contents-div" style={{ marginTop: 5 }}>
            <span>{value?.contents}</span>
          </div>
          <div className="time-div" style={{ marginTop: 5 }}>
            <span>{value?.create_date}</span>
          </div>
        </ContentsArea>
      </Wrapper>

      <CountsWrapper>
        {value?.retweet_count === 0 && value?.like_count === 0 && (
          <p>트윗 활동이 없습니다.</p>
        )}
        {value?.retweet_count > 0 && (
          <CountArea className="count-area">
            <span className="count">{value?.retweet_count}</span>
            <span className="count-text">리트윗</span>
          </CountArea>
        )}
        {value?.like_count > 0 && (
          <CountArea className="count-area" style={{ marginLeft: 10 }}>
            <span className="count">{value?.like_count}</span>
            <span className="count-text">마음에 들어요</span>
          </CountArea>
        )}
      </CountsWrapper>

      <ButtonWrapper>
        <Comment comments={value?.comments} showCount={false} />
        <Retweet
          retweet={value?.retweet}
          user_id={user_id}
          isLogin={isLogin}
          showCount={false}
          tweet_id={value?.tweet_id}
          onChangeTimeLine={onChangeTweet}
        />
        <Heart
          like={value?.like}
          user_id={user_id}
          isLogin={isLogin}
          showCount={false}
          tweet_id={value?.tweet_id}
          onChangeTimeLine={onChangeTweet}
        />
        <Share />
      </ButtonWrapper>
    </Container>
  );
}
