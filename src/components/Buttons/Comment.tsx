import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
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

interface IComment {
  comments: string[];
}

export default function Comment({ comments }: IComment) {
  const comments_count = useMemo(() => {
    return comments.length;
  }, [comments]);
  return (
    <Container>
      <Icon icon={faComment} />
      <CountWrapper>
        {comments_count > 0 ? <span>{comments_count}</span> : <></>}
      </CountWrapper>
    </Container>
  );
}
