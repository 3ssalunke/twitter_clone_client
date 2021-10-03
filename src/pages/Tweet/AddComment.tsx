import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import ProfileImage from '../../components/ProfileImage';
import createRandomTweetId from '../../util/createRandomTweetId';

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 16px;
  border-top: 1px solid rgb(239, 243, 244);
  border-bottom: 1px solid rgb(239, 243, 244);
`;
const ContentsArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  margin-left: 10px;
`;
const Input = styled.input`
  width: 100%;
  max-width: 510px;
  height: 52px;
  border: 0;
  min-height: 28px;
  box-sizing: border-box;
  padding-left: 16px;
  font-size: 18px;
  &&:focus {
    outline: none;
  }
`;
const SubmitButton = styled(Button)`
  width: 94px;
  height: 36px;
  background-color: rgb(29, 155, 240);
  border-radius: 20px;
  border: 0;

  p {
    color: #fff;
    font-weight: bold;
  }
`;
interface IAddCommentProp {
  profile_color: string;
  target_tweet_id: number;
  refreshComment: () => void;
}
export default function AddComment({
  profile_color,
  target_tweet_id,
  refreshComment,
}: IAddCommentProp) {
  const [contents, setContents] = useState('');

  const inputContents = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContents(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(async () => {
    try {
      const tweet_id = createRandomTweetId();
      await axios.post('/tweet/add-comment', {
        tweet_id,
        contents,
        target_tweet_id,
      });
      return refreshComment();
    } catch (error) {
      console.log('답글 등록 에러', error);
    }
  }, [contents, refreshComment, target_tweet_id]);

  return (
    <Container>
      <Wrapper>
        <ProfileImage size="small" color={profile_color} />
        <ContentsArea>
          <Input
            value={contents}
            placeholder="내 답글을 트윗합니다."
            type="text"
            onChange={inputContents}
            maxLength={140}
          />
          <SubmitButton onClick={onSubmit}>
            <p>답글</p>
          </SubmitButton>
        </ContentsArea>
      </Wrapper>
    </Container>
  );
}
