/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
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
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('/timelines', (url) =>
    axios.get(url).then((res) => res.data)
  );

  const onChangeTimeLine = useCallback(() => {
    mutate('/timelines');
    return;
  }, [mutate]);

  useEffect(() => {
    if (!authStore.isLogin) {
      history.push('/login');
    }
  }, [authStore, history]);

  if (!data) return <></>;
  if (error)
    return (
      <Container>
        <Header isLogin={authStore?.isLogin} />
        <h5 style={{ marginTop: 30 }}>에러가 발생했습니다.</h5>
      </Container>
    );
  return (
    <Container>
      <Header isLogin={authStore?.isLogin} />
      {/* {authStore?.isLogin && (
        )} */}
      <AddTweet
        profile_color={authStore?.user?.profile_color}
        onChangeTimeLine={onChangeTimeLine}
      />
      {/* @ts-ignore */}
      {data && data.length === 0 && <h5>타임라인에 트윗이 없습니다.</h5>}
      <TweetList
        data={data}
        user_id={authStore?.user?.user_id}
        isLogin={authStore?.isLogin}
        onChangeTimeLine={onChangeTimeLine}
      />
    </Container>
  );
}
