import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  text-align: center;
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
  showCount: boolean;
}

export default function Comment({ comments, showCount }: IComment) {
  const comments_count = useMemo(() => {
    if (comments) return comments.length;
    else return 0;
  }, [comments]);

  return (
    <Container>
      <Icon icon={faComment} />
      {showCount && (
        <CountWrapper>
          {comments_count > 0 ? <span>{comments_count}</span> : <></>}
        </CountWrapper>
      )}
    </Container>
  );
}
