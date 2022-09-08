import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';
import Arrow from '../../../assets/arrow.svg';
import ReviewItem from './reviewItem';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { fetchReviews } from 'redux/slicers/store/homePageSlicer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { THomePageState } from 'redux/types';

const Reviews = () => {
  const dispatch = useAppDispatch();
  const { reviews } = useAppSelector<THomePageState>((state) => state.homePage);
  const [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ] = paginateHandler();

  useEffect(() => {
    setRefType('width');
    dispatch(fetchReviews());
    setSlideAmount(150);
  }, []);

  return (
    <Container
      variants={variants.fadInOut}
      key="section_four"
      initial="start"
      whileInView="middle"
      flex_direction="row"
      justify_content="space-evenly"
      padding="50px 0"
      bg_color="#1e1e1e"
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="35px"
        >
          <Header>
            <h4>Пусть клиенты</h4>
            <h3>Говорят за нас</h3>
          </Header>

          <FlexWrapper>
            <Flex
              drag="x"
              dragConstraints={{ right: 0, left: -widthOrHeight }}
              ref={widthOrHeightRef}
              custom={slideTo}
              animate="animate"
              variants={variants.sliderX}
            >
              {reviews.map((review, index) => (
                <ReviewItem
                  key={`review-item-${index}`}
                  index={index}
                  review={review}
                />
              ))}
            </Flex>
          </FlexWrapper>

          <BtnWrapper>
            <ArrowBtns
              whileHover="hover"
              whileTap="tap"
              custom={1.2}
              variants={variants.grow}
              bgcolor={color.textPrimary}
              boxshadow={color.boxShadow}
              onClick={() => paginate(1)}
            >
              <ArrowSpan rotate="180">
                <Arrow />
              </ArrowSpan>
            </ArrowBtns>
            <ArrowBtns
              whileHover="hover"
              whileTap="tap"
              custom={1.2}
              variants={variants.grow}
              bgcolor={color.textPrimary}
              boxshadow={color.boxShadow}
              onClick={() => paginate(-1)}
            >
              <ArrowSpan rotate="0">
                <Arrow />
              </ArrowSpan>
            </ArrowBtns>
          </BtnWrapper>
        </Content>
      </Wrapper>
    </Container>
  );
};

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h4 {
    font-size: 1.5rem;
    color: ${color.textPrimary};
  }
  h3 {
    font-size: 2.5rem;
    color: ${color.yellow};
  }
`;

const FlexWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  cursor: grab;
`;

const Flex = styled(motion.ul)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 33px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flext-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`;

export default Reviews;
