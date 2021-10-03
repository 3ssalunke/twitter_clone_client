import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ITweet, IUser } from '../../types';
import { useAuthContext } from '../../context/AuthContext';
import TweetList from '../../components/Tweet/TweetList';
import Header from '../../components/Header/Header';
import UserProfile from './UserProfile';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default function User() {
  const params: { userid: string } = useParams();
  const [userInfo, setUserInfo] = useState<IUser>({
    user_id: '',
    name: '',
    profile_color: '',
    description: '',
    follower: [],
    following: [],
    follower_count: 0,
    following_count: 0,
  });
  const [tweetList, setTweetList] = useState<ITweet[]>([]);
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();

  const getUserTimeLine = useCallback(async () => {
    try {
      const response = await axios.get(`/reading/timeline/${params.userid}`);
      console.log('결과::', response.data);
      setTweetList(response.data?.timeLine);
      setUserInfo(response.data?.user);
      setLoading(false);
      return;
    } catch (error) {
      console.log('에러');
      return;
    }
  }, [params.userid]);

  useEffect(() => {
    getUserTimeLine();
  }, [getUserTimeLine]);

  if (loading) return <></>;

  return (
    <Container>
      <Header isLogin={authStore?.isLogin} />
      <UserProfile
        login_user_id={authStore?.user?.user_id}
        user_id={userInfo.user_id}
        name={userInfo.name}
        profile_color={userInfo.profile_color}
        description={userInfo.description}
        following={userInfo.following}
        follower={userInfo.follower}
        follower_count={userInfo.follower_count}
        following_count={userInfo.following_count}
        isLoginedUserProfile={authStore?.user?.user_id === userInfo.user_id}
      />
      {tweetList.length === 0 && <h5>타임라인에 트윗이 없습니다.</h5>}
      <TweetList
        data={tweetList}
        user_id={authStore?.user?.user_id}
        isLogin={authStore?.isLogin}
      />
    </Container>
  );
}
