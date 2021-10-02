import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  text-align: center;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)<{ isactive: boolean }>`
  font-size: 1rem;
  cursor: pointer;
  ${(props) =>
    props.isactive &&
    css`
      color: green;
    `}
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
}

export default function Retweet({
  user_id,
  retweet,
  isLogin,
  showCount,
}: IRetweet) {
  const isActive = useMemo(() => {
    if (retweet.includes(user_id)) {
      return true;
    } else return false;
  }, [user_id, retweet]);
  const retweet_count = useMemo(() => {
    return retweet.length;
  }, [retweet]);

  const onChangeRetweet = useCallback(() => {
    if (!isLogin) {
      alert('로그인 후 이용할 수 있습니다.');
    } else {
      console.log('test');
    }
  }, [isLogin]);

  return (
    <Container>
      <Icon isactive={isActive} icon={faRetweet} onClick={onChangeRetweet} />
      {showCount && (
        <CountWrapper>
          {retweet_count > 0 ? <span>{retweet_count}</span> : <></>}
        </CountWrapper>
      )}
    </Container>
  );
}
