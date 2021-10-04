import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import FollowButton from '../../components/Buttons/FollowButton';
import ProfileImage from '../../components/ProfileImage';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  margin-bottom: 16px;
`;
const ProfileWrapper = styled.div`
  position: relative;
  .profile-user-name {
    font-weight: bold;
  }
  .profile-user-id {
    color: rgb(83, 100, 113);
  }
`;
const DescriptionWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  span {
    font-size: 1.1rem;
  }
`;
const FollowButtonWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  right: 0;
`;

const FollowCountWrapper = styled.div`
  width: 100%;
  height: 48px;
`;
const CountArea = styled.div`
  display: inline-block;
  .count {
    font-weight: bold;
  }
  .count-text {
    margin-left: 3px;
  }
`;

interface IUserProfileProps {
  login_user_id: string;
  user_id: string;
  name: string;
  profile_color: string;
  description: string;
  following?: string[];
  follower: string[];
  follower_count: number;
  following_count: number;
  isLoginedUserProfile?: boolean;
  onChangeStatus?: any;
}
export default function UserProfile({
  login_user_id,
  user_id,
  name,
  profile_color,
  description,
  follower,
  follower_count,
  following_count,
  isLoginedUserProfile,
  onChangeStatus,
}: IUserProfileProps) {
  return (
    <Container>
      <ProfileWrapper>
        <>
          <ProfileImage size="big" color={profile_color} />
          <div style={{ marginTop: 10 }}>
            <span className="profile-user-name">{name}</span>
          </div>
          <div>
            <span className="profile-user-id">{`@${user_id}`}</span>
          </div>
        </>
        <FollowButtonWrapper>
          <FollowButton
            target_user_id={user_id}
            isLoginedUserProfile={isLoginedUserProfile}
            follower={follower}
            login_user_id={login_user_id}
            onChangeStatus={onChangeStatus}
          />
        </FollowButtonWrapper>
      </ProfileWrapper>
      <DescriptionWrapper>
        <span>{description}</span>
      </DescriptionWrapper>
      <FollowCountWrapper>
        {following_count > 0 && (
          <CountArea className="count-area">
            <span className="count">{following_count}</span>
            <span className="count-text">팔로우 중</span>
          </CountArea>
        )}
        {follower_count > 0 && (
          <CountArea className="count-area" style={{ marginLeft: 10 }}>
            <span className="count">{follower_count}</span>
            <span className="count-text">팔로워</span>
          </CountArea>
        )}
      </FollowCountWrapper>
    </Container>
  );
}
