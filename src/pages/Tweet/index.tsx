import React, { useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import Header from '../../components/Header/Header';
import { useAuthContext } from '../../context/AuthContext';
import DetailTweet from '../../components/Tweet/DetailTweet';
import AddComment from './AddComment';
import TweetList from '../../components/Tweet/TweetList';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  border-left: 1px solid rgb(239, 243, 244);
  border-right: 1px solid rgb(239, 243, 244);
`;

export default function Tweet() {
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();
  const params: { user: string; tweetid: string } = useParams();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/tweets/${params.tweetid}`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const onChangeTweet = useCallback(() => {
    // 답글을 작성한 후 트윗을 갱신합니다.
    mutate(`/tweets/${params.tweetid}`);
    return;
  }, [mutate, params.tweetid]);

  if (!data) return <></>;
  if (error)
    return (
      <Container>
        <Header isLogin={authStore?.isLogin} />
        <Wrapper>
          <h5 style={{ marginTop: 30 }}>에러가 발생했습니다.</h5>
        </Wrapper>
      </Container>
    );

  return (
    <Container>
      <Header isLogin={authStore?.isLogin} />
      <Wrapper>
        <DetailTweet
          value={data?.origin}
          user_id={authStore?.user?.user_id}
          isLogin={authStore?.isLogin}
          onChangeTweet={onChangeTweet}
        />
        {authStore?.isLogin && (
          <AddComment
            profile_color={authStore?.user?.profile_color}
            target_tweet_id={data?.origin?.tweet_id}
            onChangeTweet={onChangeTweet}
          />
        )}
        {/* comments 에다 각각 작은트윗 불러오기 */}
        <TweetList
          data={data?.comments}
          user_id={authStore?.user?.user_id}
          isLogin={authStore?.isLogin}
          onChangeTimeLine={onChangeTweet}
        />
      </Wrapper>
    </Container>
  );
}
