import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Container = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  text-align: center;
  cursor: pointer;
`;
const IconButton = styled.button`
  width: 30%;
  margin: 0 auto;
  border: none;
  border-radius: 9999px;
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 186, 124, 0.1);
  }
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;

const CountWrapper = styled.div`
  display: inline-block;
  margin-left: 5px;
  span {
    font-size: 0.8rem;
  }
`;

interface IRetweet {
  user_id: string;
  retweet: string[];
  isLogin: boolean;
  showCount: boolean;
  tweet_id?: number;
  onChangeTimeLine?: any;
}

export default function Retweet({
  user_id,
  retweet,
  isLogin,
  showCount,
  tweet_id,
  onChangeTimeLine,
}: IRetweet) {
  const isActive = useMemo(() => {
    if (retweet) {
      if (retweet.includes(user_id)) {
        return true;
      } else return false;
    } else return false;
  }, [user_id, retweet]);
  const retweet_count = useMemo(() => {
    if (retweet) return retweet.length;
    else return 0;
  }, [retweet]);

  const onChangeRetweet = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLogin) {
        alert('로그인 후 이용할 수 있습니다.');
        return;
      }
      try {
        if (isActive) await axios.delete(`/tweets/retweet/${tweet_id}`);
        else await axios.post('/tweets/retweet', { tweet_id });

        onChangeTimeLine();
        return;
      } catch (error: any) {
        console.log(error);
        console.log(error?.response?.data);
        console.log(error?.response?.status);
        console.log(error?.response?.headers);
        alert(error?.response?.data);
        return;
      }
    },
    [isActive, isLogin, onChangeTimeLine, tweet_id]
  );

  return (
    <Container>
      <IconButton onClick={onChangeRetweet}>
        <Icon color={isActive ? 'green' : 'black'} icon={faRetweet} />
      </IconButton>

      {showCount && (
        <CountWrapper>
          {retweet_count > 0 ? <span>{retweet_count}</span> : <></>}
        </CountWrapper>
      )}
    </Container>
  );
}
