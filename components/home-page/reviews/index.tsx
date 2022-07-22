import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Review } from 'swagger/services';
import Arrow from '../../../assets/arrow.svg';
import { REVIEWS } from './constants';
import { paginate } from './helpers';
import ReviewItem from './reviewItem';

type StyleProps = {
  rotate?: string;
};

const Reviews = () => {
  const [width, setWidth] = useState(0);
  const [slideTo, setSlideTo] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  const flexRef = useRef<any>();

  useEffect(() => {
    setWidth(flexRef.current.scrollWidth - flexRef.current.offsetWidth);
    // const data = generateArrayOfNumbers(5);
    setReviews(REVIEWS);
  }, []);

  return (
    <AnimatePresence>
      <Container
        variants={variants.fadInOut}
        key="section_four"
        initial="start"
        animate="middle"
        exit="end"
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
              <h3>Говорит за нас</h3>
            </Header>
            <FlexWrapper>
              <Flex
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                ref={flexRef}
                custom={slideTo}
                animate="animate"
                variants={variants.sliderUi}
              >
                <AnimatePresence>
                  {reviews.map((review, index) => (
                    <ReviewItem key={`review-item-${index}`} review={review} />
                  ))}
                </AnimatePresence>
              </Flex>
            </FlexWrapper>
            <BtnWrapper>
              <ItemBtns
                whileHover="hover"
                whileTap="tap"
                custom={1.2}
                variants={variants.grow}
                onClick={paginate(
                  1,
                  slideTo,
                  width,
                  flexRef,
                  setSlideTo,
                  setWidth,
                )}
              >
                <ArrowSpan rotate="180">
                  <Arrow />
                </ArrowSpan>
              </ItemBtns>
              <ItemBtns
                whileHover="hover"
                whileTap="tap"
                custom={1.2}
                variants={variants.grow}
                onClick={paginate(
                  -1,
                  slideTo,
                  width,
                  flexRef,
                  setSlideTo,
                  setWidth,
                )}
              >
                <ArrowSpan rotate="0">
                  <Arrow />
                </ArrowSpan>
              </ItemBtns>
            </BtnWrapper>
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
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
  justify-content: space-between;
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

const ItemBtns = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ArrowSpan = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: rotate(${(p: StyleProps) => p.rotate}deg);
`;

export default Reviews;
