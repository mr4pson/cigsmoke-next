import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import Arrow from '../../../../../assets/arrow.svg';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';
const fakeData = generateArrayOfNumbers(6);

const Pagination = (props: any) => {
  const [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ] = paginateHandler();

  useEffect(() => {
    setRefType('height');
    setSlideAmount(120);
  }, []);

  return (
    <ThumbnailContainer>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.2}
        top="-45px"
        left="35px"
        position="absolute"
        variants={variants.grow}
        bgcolor={color.textPrimary}
        boxshadow={color.boxShadowBtn}
        onClick={() => paginate(1)}
      >
        <ArrowSpan rotate="-90">
          <Arrow />
        </ArrowSpan>
      </ArrowBtns>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.2}
        top="410px"
        left="35px"
        position="absolute"
        variants={variants.grow}
        bgcolor={color.textPrimary}
        boxshadow={color.boxShadowBtn}
        onClick={() => paginate(-1)}
      >
        <ArrowSpan rotate="90">
          <Arrow />
        </ArrowSpan>
      </ArrowBtns>
      <div>
        <ThumbnailWrapper
          ref={widthOrHeightRef}
          drag="y"
          dragConstraints={{ bottom: 0, top: -widthOrHeight }}
          custom={slideTo}
          animate="animate"
          variants={variants.sliderY}
        >
          {fakeData.map((item, index) => {
            return (
              <ThumbnailItem
                key={`thumbnail-wrap-${index}`}
                onClick={() => {
                  props.setSelectedIndex(index);
                  if (index != props.selectedIndex) {
                    props.paginateImage(props.selectedIndex > index ? -1 : 1);
                  }
                }}
                border={
                  index == props.selectedIndex ? color.yellow : 'transparent'
                }
                initial="init"
                animate="animate"
                custom={index * 0.05}
                variants={variants.fadInSlideUp}
              >
                <motion.img
                  key={`thumbnail-image-${index}`}
                  initial="init"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.09 }}
                  whileTap={{ scale: 1 }}
                  custom={index * 0.09}
                  variants={variants.slideInFromRigh}
                  src={`/static/backpack.jpg`}
                />
              </ThumbnailItem>
            );
          })}
        </ThumbnailWrapper>
      </div>
    </ThumbnailContainer>
  );
};

const ThumbnailContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-conten: space-between;
    align-items: flex-start;
    overflow: hidden;
  }
`;

const ThumbnailWrapper = styled(motion.ul)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-conten: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 3px;
`;

const ThumbnailItem = styled(motion.li)`
  width: 100px;
  min-height: 100px;
  background-color: ${color.textPrimary};
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 2px 6px ${color.boxShadow};
  border: 1px solid ${(p: styleProps) => p.border};
  transition: 100ms;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

export default Pagination;
