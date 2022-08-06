import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { memo } from 'react';
import styled from 'styled-components';
import Arrow from '../../../assets/arrow.svg';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { handleDragEnd } from '../helpers';
import { IMAGES, SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import Link from 'next/link';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';

const ImageBanner = () => {
  // const [[page, direction], setPage] = useState([0, 0]);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();

  const imageIndex = wrap(0, IMAGES.length, page);

  return (
    <SliderWrapper
      key="slider-home-banners"
      custom={0.3}
      initial="init"
      animate="animate"
      exit={{ y: -80, opacity: 0, transition: { delay: 0.2 } }}
      variants={variants.fadInSlideUp}
    >
      <Link href={`/catalog/${page}`}>
        <a>
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
              onDragEnd={handleDragEnd(
                page,
                SWIPE_CONFIDENCE_THRESHOLD,
                setPage,
              )}
            />
          </AnimatePresence>
        </a>
      </Link>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.1}
        variants={variants.grow}
        right="15px"
        top="auto"
        position="absolute"
        boxshadow="transparent"
        bgcolor={color.textPrimary}
        onClick={() => paginateImage(1)}
      >
        <ArrowSpan rotate="0">
          <Arrow />
        </ArrowSpan>
      </ArrowBtns>
      <ArrowBtns
        whileHover="hover"
        whileTap="tap"
        custom={1.1}
        variants={variants.grow}
        left="15px"
        top="auto"
        position="absolute"
        boxshadow="transparent"
        bgcolor={color.textPrimary}
        onClick={() => paginateImage(-1)}
      >
        <ArrowSpan rotate="180">
          <Arrow />
        </ArrowSpan>
      </ArrowBtns>
    </SliderWrapper>
  );
};

const SliderWrapper = styled(motion.div)`
  width: 100%;
  height: 462px;
  padding-top: 5px;
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

export default memo(ImageBanner);
