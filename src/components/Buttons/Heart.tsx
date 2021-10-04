import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as activeHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as nonActiveHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

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
  showCount: boolean;
  tweet_id?: number;
  onChangeTimeLine?: any;
}

export default function Heart({
  user_id,
  like,
  isLogin,
  tweet_id,
  showCount,
  onChangeTimeLine,
}: IHeartProps) {
  const isActive = useMemo(() => {
    if (like) {
      if (like.includes(user_id)) {
        return true;
      } else return false;
    } else return false;
  }, [user_id, like]);
  const like_count = useMemo(() => {
    if (like) return like.length;
    else return 0;
  }, [like]);

  const onChangeLike = useCallback(
    async (e: React.MouseEvent<SVGSVGElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLogin) {
        alert('로그인 후 이용할 수 있습니다.');
        return;
      }
      try {
        const apiUrl = isActive ? '/tweet/undo-like' : '/tweet/do-like';
        await axios.patch(apiUrl, { tweet_id });

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
      <Icon
        isactive={isActive}
        icon={isActive ? activeHeart : nonActiveHeart}
        onClick={onChangeLike}
      />
      {showCount && (
        <CountWrapper>
          {like_count > 0 ? <span>{like_count}</span> : <></>}
        </CountWrapper>
      )}
    </Container>
  );
}
