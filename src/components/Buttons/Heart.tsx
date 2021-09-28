import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as activeHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as nonActiveHeart } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled(FontAwesomeIcon)<{ isactive: boolean }>`
  font-size: 1rem;
  cursor: pointer;
  ${(props) =>
    props.isactive &&
    css`
      color: #f91880;
    `}
`;

const CountWrapper = styled.div`
  display: inline-block;
  margin-left: 5px;
  span {
    font-size: 0.8rem;
  }
`;

interface IHeartProps {
  user_id: string;
  like: string[];
  isLogin: boolean;
}

export default function Heart({ user_id, like, isLogin }: IHeartProps) {
  const isActive = useMemo(() => {
    if (like.includes(user_id)) {
      return true;
    } else return false;
  }, [user_id, like]);
  const like_count = useMemo(() => {
    return like.length;
  }, [like]);

  const onChangeHeart = useCallback(() => {
    if (!isLogin) {
      alert('로그인 후 이용할 수 있습니다.');
    } else {
      console.log('test');
    }
  }, [isLogin]);

  return (
    <Container>
      <Icon
        isactive={isActive}
        icon={isActive ? activeHeart : nonActiveHeart}
        onClick={onChangeHeart}
      />
      <CountWrapper>
        {like_count > 0 ? <span>{like_count}</span> : <></>}
      </CountWrapper>
    </Container>
  );
}
