import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import Arrow from '../../../../../../assets/arrow.svg';
import { handlePaginate } from '../helpers';

type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const Pagination: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
}) => {
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
    setSlideAmount(120);
  });

  return (
    <ThumbnailContainer>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.2}
        top="80px"
        left="0"
        position="absolute"
        variants={variants.grow}
        bgcolor={color.textPrimary}
        boxshadow={color.boxShadowBtn}
        onClick={() => paginate(1)}
      >
        <ArrowSpan rotate="-180">
          <Arrow />
        </ArrowSpan>
      </ArrowBtns>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.2}
        top="80px"
        left="70px"
        position="absolute"
        variants={variants.grow}
        bgcolor={color.textPrimary}
        boxshadow={color.boxShadowBtn}
        onClick={() => paginate(-1)}
      >
        <ArrowSpan rotate="0">
          <Arrow />
        </ArrowSpan>
      </ArrowBtns>
      <div className="thumbnail-content">
        <ThumbnailWrapper
          ref={widthOrHeightRef}
          drag="x"
          dragConstraints={{ left: 0, right: -widthOrHeight }}
          custom={slideTo}
          animate="animate"
          variants={variants.sliderX}
        >
          {images.map((image, index) => {
            return (
              <ThumbnailItem
                key={`thumbnail-wrap-${index}`}
                onClick={handlePaginate(
                  index,
                  selectedIndex,
                  setSelectedIndex,
                  paginateImage,
                )}
                border={index == selectedIndex ? color.yellow : 'transparent'}
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
                  src={`/api/images/${image}`}
                  style={{
                    width: index == selectedIndex ? '100%' : '50px',
                    height: index == selectedIndex ? '100%' : '50px',
                  }}
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  .thumbnail-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-conten: space-between;
    align-items: flex-start;
    overflow: hidden;
  }
`;

const ThumbnailWrapper = styled(motion.ul)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-conten: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 3px;
`;

const ThumbnailItem = styled(motion.li)`
  width: 50px;
  min-height: 50px;
  min-width: 50px;
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
    object-fit: contain;
    border-radius: 10px;
  }
`;

export default Pagination;
