import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { memo, useState } from 'react';
import styled from 'styled-components';
import Arrow from '../../../assets/arrow.svg';
import { ArrowSpan } from './common';
import { handleDragEnd, paginateBack, paginateForward } from '../helpers';
import { IMAGES, SWIPE_CONFIDENCE_THRESHOLD } from './constants';

type StyleProps = {
  left?: string;
  right?: string;
};

const ImageBanner = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, IMAGES.length, page);

  return (
    <AnimatePresence>
      <SliderWrapper
        key="slider"
        custom={0.3}
        initial="init"
        animate="animate"
        exit="exit"
        variants={variants.fadInSlideUp}
      >
        <AnimatePresence initial={false} custom={direction}>
          <Slider
            key={page}
            src={IMAGES[imageIndex]}
            custom={direction}
            variants={variants.slider}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd(page, SWIPE_CONFIDENCE_THRESHOLD, setPage)}
          />
        </AnimatePresence>
        <ArrowBtn
          whileHover="hover"
          whileTap="tap"
          custom={1.1}
          variants={variants.grow}
          right="15"
          onClick={paginateForward(page, setPage)}
        >
          <ArrowSpan rotate="0">
            <Arrow />
          </ArrowSpan>
        </ArrowBtn>
        <ArrowBtn
          whileHover="hover"
          whileTap="tap"
          custom={1.1}
          variants={variants.grow}
          left="15"
          onClick={paginateBack(page, setPage)}
        >
          <ArrowSpan rotate="180">
            <Arrow />
          </ArrowSpan>
        </ArrowBtn>
      </SliderWrapper>
    </AnimatePresence>
  );
};

const SliderWrapper = styled(motion.div)`
  width: 100%;
  height: 462px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled(motion.img)`
  width: 100%;
  height: 462px;
  border-radius: 25px;
  position: absolute;
  left: 0;
  top: 0;
`;

const ArrowBtn = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  left: ${(p: StyleProps) => p.left}px;
  right: ${(p: StyleProps) => p.right}px;
  top: auto;
  background-color: ${color.textPrimary};
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default memo(ImageBanner);
