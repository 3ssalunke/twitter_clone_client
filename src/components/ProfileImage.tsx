import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div``;
const Image = styled.img<{ size: 'big' | 'middle' | 'small' }>`
  ${(props) =>
    props.size === 'big'
      ? css`
          width: 135px;
        `
      : props.size === 'middle'
      ? css`
          width: 64px;
        `
      : css`
          width: 48px;
        `}
  border-radius: 50%;
`;

interface IProfileImageProps {
  size: 'big' | 'middle' | 'small';
  imagePath: string;
}

// @ts-ignore
export default function ProfileImage({ size, imagePath }: IProfileImageProps) {
  return (
    <Container>
      <Image size={size} src={imagePath} />
    </Container>
  );
}
