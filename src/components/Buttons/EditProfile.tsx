import React, { useCallback, useState } from 'react';
import { TwitterPicker, ColorResult } from 'react-color';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 1;
  cursor: pointer;
`;

interface IEditProfileProps {
  color: string;
  onChangeColor: (color: string) => void;
}

const ProfileButton = styled.button<{ color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  background-color: ${(props) => props.color};
`;

// @ts-ignore
export default function EditProfile({
  color,
  onChangeColor,
}: IEditProfileProps) {
  const [showModal, setShowModal] = useState(false);
  const onToggleModal = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setShowModal((prev) => !prev);
    return;
  }, []);

  const onSelectColorAndCloseModal = useCallback(
    (color: ColorResult) => {
      onChangeColor(color.hex);
      setShowModal(false);
    },
    [onChangeColor]
  );

  return (
    <>
      <Container onClick={onToggleModal}>
        <ProfileButton color={color} />
      </Container>

      <Modal isOpen={showModal}>
        <ModalHeader toggle={onToggleModal}>
          프로필 이미지를 선택하세요.
        </ModalHeader>
        <ModalBody>
          <TwitterPicker
            color={color}
            onChangeComplete={onSelectColorAndCloseModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
