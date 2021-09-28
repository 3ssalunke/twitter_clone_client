import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;

export default function Share() {
  return (
    <Container>
      <Icon icon={faExternalLinkAlt} />
    </Container>
  );
}
