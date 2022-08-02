import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as React from 'react';
import { Rating } from '@mui/material'; // docs: https://mui.com/material-ui/api/rating/ *** https://mui.com/material-ui/react-rating/
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import ShareToSocial from './ShareToSocial';
import DropDowns from './DropDowns';
import ActionBtns from './ActionBtns';
import ColorPicker from './ColorPicker';
import { UserSelectWrapper } from './common';
import Quastions from '../../../../../assets/quastions.svg';

const Details = (props: any) => {
  return (
    <DetailsContainer>
      <ShareToSocial />
      <UserSelectWrapper>
        <motion.h1
          key="title-product-page"
          custom={0.1}
          initial="init"
          animate="animate"
          exit={{ y: -20, opacity: 0, transition: { delay: 0.05 } }}
          variants={variants.fadInSlideUp}
        >
          Чаша синий для кальяна
        </motion.h1>
        <ConvoContainer>
          <ConvoWrappers
            key="reveiws-product-page"
            custom={0.2}
            initial="init"
            animate="animate"
            exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
            variants={variants.fadInSlideUp}
          >
            <Rating value={5} size="small" readOnly />

            <span
              onClick={() => {
                props.reviewRef.current.click();
                props.reviewRef.current.scrollIntoView();
              }}
            >
              <span>148 Отзывы</span>
            </span>
          </ConvoWrappers>
          <ConvoWrappers
            key="quastions-product-page"
            custom={0.3}
            initial="init"
            animate="animate"
            exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
            variants={variants.fadInSlideUp}
          >
            <span>
              <Quastions />
            </span>

            <span
              onClick={() => {
                props.questionRef.current.click();
                props.questionRef.current.scrollIntoView();
              }}
            >
              <span>31 вопрос</span>
            </span>
          </ConvoWrappers>
        </ConvoContainer>
        <PriceWrapper
          key="prices-product-page"
          custom={0.35}
          initial="init"
          animate="animate"
          exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
          variants={variants.fadInSlideUp}
        >
          <PriceItem>350₽</PriceItem>
          <PriceItem>450₽</PriceItem>
        </PriceWrapper>
        <ColorPicker {...props} />
      </UserSelectWrapper>
      <ActionBtns />
      <DropDowns />
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 60px;
`;

const ConvoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const ConvoWrappers = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  span {
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      color: ${color.hover};
    }
  }
`;

const PriceWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const PriceItem = styled.span`
  &:nth-child(1) {
    font-size: 1.5rem;
    font-family: 'intro';
  }
  &:nth-child(2) {
    font-size: 1rem;
    font-family: 'intro';
    text-decoration: line-through;
    text-decoration-color: ${color.hover};
    color: ${color.textSecondary};
  }
`;

export default Details;
