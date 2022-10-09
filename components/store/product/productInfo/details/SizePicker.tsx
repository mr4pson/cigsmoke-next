import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import React, { useEffect } from 'react';
import { Size } from 'swagger/services';

type Props = {
  sizeIsOpen: boolean;
  setOpen: any;
  sizes?: Size[];
  setSelectedSize: any;
};

const SizePicker: React.FC<Props> = ({
  sizeIsOpen,
  sizes,
  setSelectedSize,
  setOpen,
}) => {
  const handleSelectedSize = (
    setSelectedSize,
    index,
    setOpen,
    selectedSize,
  ) => {
    setSelectedSize(index);
    setOpen(false);
    localStorage.setItem('selectedSize', JSON.stringify(selectedSize));
  };
  useEffect(() => {
    if (sizes) {
      localStorage.setItem('selectedSize', JSON.stringify(sizes[0].name ?? ''));
    }
  }, []);
  return (
    <Container
      animate={sizeIsOpen ? 'animate' : 'init'}
      custom={0.03}
      variants={variants.fadInSlideUp}
      style={{ display: sizeIsOpen ? 'flex' : 'none' }}
    >
      <Wrapper>
        {sizes?.map((item, index) => {
          return (
            <li
              onClick={() =>
                handleSelectedSize(setSelectedSize, index, setOpen, item.name)
              }
              key={index}
            >
              {item.name}
            </li>
          );
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${color.textPrimary};
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  z-index: 9;
`;

const Wrapper = styled.ul`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  overflow-y: scroll;
  li {
    width: 100%;
    padding: 20px;
    font-family: 'intro';
    &:hover {
      background-color: ${color.textSecondary};
      color: ${color.textPrimary};
    }
  }
`;

export default SizePicker;
