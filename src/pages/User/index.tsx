import React, { useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useSWR, { useSWRConfig, SWRConfig } from 'swr';
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
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/reading/timeline/${params.userid}`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const onChangeTimeLine = useCallback(() => {
    mutate(`/reading/timeline/${params.userid}`);
    return;
  }, [mutate, params.userid]);

  if (!data) return <></>;
  if (error)
    return (
      <Container>
        <Header isLogin={authStore?.isLogin} />
        <div style={{ marginTop: 10 }}>
          <h5>에러가 발생했습니다.</h5>
        </div>
      </Container>
    );

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <Container>
        <Header isLogin={authStore?.isLogin} />
        <UserProfile
          login_user_id={authStore?.user?.user_id}
          user_id={data?.user.user_id}
          name={data?.user.name}
          profile_color={data?.user.profile_color}
          description={data?.user.description}
          following={data?.user.following}
          follower={data?.user.follower}
          follower_count={data?.follower_count}
          following_count={data?.following_count}
          isLoginedUserProfile={authStore?.user?.user_id === data?.user.user_id}
          onChangeStatus={onChangeTimeLine}
        />
        {data?.timeLine.length === 0 && <h5>타임라인에 트윗이 없습니다.</h5>}
        <TweetList
          data={data?.timeLine}
          user_id={authStore?.user?.user_id}
          isLogin={authStore?.isLogin}
          onChangeTimeLine={onChangeTimeLine}
        />
      </Container>
    </SWRConfig>
  );
}
