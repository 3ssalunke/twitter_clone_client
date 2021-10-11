import React, { useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  text-align: center;
  cursor: pointer;
`;
const IconButton = styled.button`
  width: 30%;
  margin: 0 auto;
  border: none;
  border-radius: 9999px;
  background-color: transparent;
  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;

export default function Share() {
  const onCopyUrl = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // 출처: https://stackoverflow.com/a/52033479
    navigator.clipboard.writeText(window.location.href);
    toast('링크를 클립보드에 복사했습니다.', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    return;
  }, []);
  return (
    <Container>
      <IconButton onClick={onCopyUrl}>
        <Icon icon={faExternalLinkAlt} />
      </IconButton>
    </Container>
  );
}
