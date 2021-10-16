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

export default function AddTweet({
  profile_color,
  onChangeTimeLine,
}: {
  profile_color: string;
  onChangeTimeLine: any;
}) {
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
      await axios.post('/tweets', { tweet_id, contents });
      onChangeTimeLine();
      setContents('');
      return;
    } catch (error: any) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      alert(error.response.data);
      return;
    }
  }, [contents, onChangeTimeLine]);

  return (
    <Container>
      <Wrapper>
        <ProfileImage size="small" color={profile_color} />
        <ContentsArea>
          <Input
            value={contents}
            placeholder="무슨 일이 일어나고 있나요?"
            type="text"
            onChange={inputContents}
            maxLength={140}
          />
          <SubmitButton onClick={onSubmit}>
            <p>트윗하기</p>
          </SubmitButton>
        </ContentsArea>
      </Wrapper>
    </Container>
  );
}
