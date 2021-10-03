/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ITweet } from '../../types';
import TweetList from '../../components/Tweet/TweetList';
import AddTweet from './AddTweet';
import { useAuthContext } from '../../context/AuthContext';
import Header from '../../components/Header/Header';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default function Home() {
  const history = useHistory();
  const [tweetList, setTweetList] = useState<ITweet[]>([]);
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();
  // useSWR?
  const getHomeTImeLine = useCallback(async () => {
    try {
      const response = await axios.get('/reading/home');
      console.log('홈', response.data);
      setTweetList(response.data);
      setLoading(false);
      return;
    } catch (error) {
      console.log('에러', error);
      setLoading(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (authStore.isLogin) {
      getHomeTImeLine();
    } else {
      history.push('/login');
    }
  }, [authStore, getHomeTImeLine, history]);

  if (loading) return <></>;
  return (
    <Container>
      <Header isLogin={authStore?.isLogin} />
      {/* {authStore?.isLogin && (
        )} */}
      <AddTweet profile_color={authStore?.user?.profile_color} />
      {/* @ts-ignore */}
      {tweetList.length === 0 && <h5>타임라인에 트윗이 없습니다.</h5>}
      <TweetList
        data={tweetList}
        user_id={authStore?.user?.user_id}
        isLogin={authStore?.isLogin}
      />
    </Container>
  );
}
