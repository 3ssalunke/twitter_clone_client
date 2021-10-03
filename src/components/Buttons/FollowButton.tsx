import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button<{ isFollow: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 94px;
  height: 36px;
  border-radius: 9999px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: ${(props) => (props.isFollow ? '#fff' : '#000')};
  color: ${(props) => (props.isFollow ? '#000' : '#fff')};
`;
const ProfileEditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 120px;
  height: 36px;
  border-radius: 9999px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #fff;
  color: #000;
`;

interface IFollowButtonProps {
  login_user_id: string;
  target_user_id: string;
  follower: string[];
  isLoginedUserProfile?: boolean;
}

export default function FollowButton({
  login_user_id,
  target_user_id,
  follower,
  isLoginedUserProfile,
}: IFollowButtonProps) {
  const history = useHistory();
  const isFollow = useMemo(() => {
    console.log('대상 사용자의 팔로워: ', follower);
    if (follower && follower.includes(login_user_id)) {
      return true;
    } else return false;
  }, [follower, login_user_id]);
  const onClickFollowButton = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      try {
        const apiUrl = isFollow ? 'unfollow-user' : 'follow-user';

        await axios.patch(`/user/${apiUrl}`, { target_user_id });
        history.go(0);
        return;
      } catch (error: any) {
        console.log('에러', error?.response?.status, error?.response);

        return;
      }
    },
    [history, isFollow, target_user_id]
  );
  const moveToEditPage = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      history.push('/setting');
    },
    [history]
  );

  return (
    <>
      {isLoginedUserProfile ? (
        <ProfileEditButton onClick={moveToEditPage}>
          <span>프로필 수정</span>
        </ProfileEditButton>
      ) : (
        <Button isFollow={isFollow} onClick={onClickFollowButton}>
          {isFollow ? '팔로잉' : '팔로우'}
        </Button>
      )}
    </>
  );
}
