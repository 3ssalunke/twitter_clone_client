import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Container = styled.div`
  z-index: 1;
  cursor: pointer;
`;

interface IProfileImageProps {
  size: 'big' | 'middle' | 'small';
  color: string;
  user_id?: string;
}

const Profile = styled.div<IProfileImageProps>`
  ${(props) =>
    props.size === 'big'
      ? css`
          width: 135px;
          height: 135px;
        `
      : props.size === 'middle'
      ? css`
          width: 64px;
          height: 64px;
        `
      : css`
          width: 48px;
          height: 48px;
        `}
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  background-color: ${(props) => props.color};
`;

// @ts-ignore
export default function ProfileImage({
  size,
  color,
  user_id,
}: IProfileImageProps) {
  const history = useHistory();
  const moveToUserTimeLine = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // AddTweet, AddComment 에서는 이동하지 않도록 막기 위해서 조건문을 추가했습니다.
      if (user_id) {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/${user_id}`);
        return;
      } else return;
    },
    [history, user_id]
  );
  return (
    <Container onClick={moveToUserTimeLine}>
      <Profile size={size} color={color} />
    </Container>
  );
}
