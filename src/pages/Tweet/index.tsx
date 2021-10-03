import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuthContext } from '../../context/AuthContext';
import DetailTweet from '../../components/Tweet/DetailTweet';
import { ITweet } from '../../types';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [firstTweet, setFirstTweet] = useState<ITweet>({
    tweet_id: 0,
    user_id: '',
    video: null,
    image: [],
    contents: '',
    create_date: '',
    retweet: [],
    retweet_count: 0,
    like: [],
    like_count: 0,
    comments: [],
    comments_count: 0,
    is_active: false,
    user: {
      name: '',
      user_id: '',
      profile_color: '',
      description: '',
      follower: [],
      following: [],
      follower_count: 0,
      following_count: 0,
    },
  });
  const [comments, setComments] = useState<ITweet[]>([]);
  // @ts-ignore
  const [authStore, authDispatch] = useAuthContext();
  const params: { user: string; tweetid: string } = useParams();

  const getDetailTweet = useCallback(async () => {
    try {
      const response = await axios.get(`/reading/${params.tweetid}`);
      console.log('결과: ', response.data);
      setFirstTweet(response.data.origin);
      setComments(response.data.comments);

      setLoading(false);
      return;
    } catch (error) {
      console.log('error', error);
      return;
    }
  }, [params.tweetid]);
  const history = useHistory();
  const refreshComment = useCallback(() => {
    // 답글을 작성한 후 실행합니다.
    history.go(0);
    return;
  }, [history]);

  useEffect(() => {
    getDetailTweet();
  }, [getDetailTweet]);

  if (loading)
    return (
      <Container>
        <Header isLogin={authStore?.isLogin} />
        <Wrapper>
          <h5 style={{ marginTop: 30 }}>{errorMessage}</h5>
        </Wrapper>
      </Container>
    );

  return (
    <Container>
      <Header isLogin={authStore?.isLogin} />
      <Wrapper>
        <DetailTweet
          value={firstTweet}
          user_id={authStore?.user?.user_id}
          isLogin={authStore?.isLogin}
        />
        {authStore?.isLogin && (
          <AddComment
            profile_color={authStore?.user?.profile_color}
            target_tweet_id={firstTweet.tweet_id}
            refreshComment={refreshComment}
          />
        )}
        {/* comments 에다 각각 작은트윗 불러오기 */}
        <TweetList
          data={comments}
          user_id={authStore?.user?.user_id}
          isLogin={authStore?.isLogin}
        />
      </Wrapper>
    </Container>
  );
}
