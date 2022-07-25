import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import { useState } from 'react';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Arrow from '../../assets/arrow.svg';
import HeartEmpty from '../../assets/heart_empty.svg';
import HeartFull from '../../assets/heart_full.svg';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../components/home-page/bestsellers/constants';
import {
  handleDragEnd,
  handleWishBtnClick,
  paginateBack,
  paginateForward,
} from '../../components/home-page/helpers';

type StyleProps = {
  rotate?: string;
  top?: string;
  bgcolor?: string;
  boxshadow?: string;
};

type Props = {
  url?: string;
  images: string[];
  product: Product;
  isInWishlist: boolean;
  onWishBtnClick: (product: Product) => void;
};

const Slider: React.FC<Props> = ({
  product,
  url,
  images,
  isInWishlist,
  onWishBtnClick,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const [isWish, setWish] = useState(isInWishlist);

  return (
    <>
      <ImageSliderWrapper>
        <AnimatePresence>
          <ImageSlider
            key={'test'}
            custom={direction}
            variants={variants.sliderProduct}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              },
              opacity: { duration: 0.4 },
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd(page, SWIPE_CONFIDENCE_THRESHOLD, setPage)}
          >
            <Link href={`/${url}`}>
              <AnimatePresence>
                <a>
                  <motion.img
                    key={`slider-image`}
                    whileHover="hover"
                    whileTap="tap"
                    custom={1.2}
                    variants={variants.grow}
                    transition={{ ease: 'easeInOut' }}
                    src={images[imageIndex]}
                  />
                </a>
              </AnimatePresence>
            </Link>
          </ImageSlider>
        </AnimatePresence>
        <AnimatePresence>
          <ItemBtns
            key={isWish ? 'heart-full' : 'heart-empty'}
            initial="init"
            animate="animate"
            exit="exit"
            variants={
              isWish ? variants.fadeInSlideIn : variants.fadeOutSlideOut
            }
            top="15"
            bgcolor="transparent;"
            boxshadow={color.textPrimary}
            onClick={handleWishBtnClick(product, setWish, onWishBtnClick)}
          >
            {isWish ? <HeartFull /> : <HeartEmpty />}
          </ItemBtns>
        </AnimatePresence>
        <ItemBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="210"
          bgcolor={color.textPrimary}
          boxshadow={color.boxShadowBtn}
          onClick={paginateForward(page, setPage)}
        >
          <ArrowSpan rotate="-90">
            <Arrow />
          </ArrowSpan>
        </ItemBtns>
        <ItemBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="270"
          bgcolor={color.textPrimary}
          boxshadow={color.boxShadowBtn}
          onClick={paginateBack(page, setPage)}
        >
          <ArrowSpan rotate="90">
            <Arrow />
          </ArrowSpan>
        </ItemBtns>
      </ImageSliderWrapper>
    </>
  );
};

const ImageSliderWrapper = styled(motion.div)`
  width: 270px;
  height: 320px;
  background-color: ${color.textPrimary};
  border-radius: 20px;
  box-shadow: 0px 2px 6px ${color.boxShadow};
  position: relative;
  overflow: hidden;
`;
const ImageSlider = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 70px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const ItemBtns = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  right: 15px;
  top: ${(p: StyleProps) => p.top}px;
  background-color: ${(P: StyleProps) => P.bgcolor};
  box-shadow: 0px 2px 6px ${(P: StyleProps) => P.boxshadow};
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

export default Slider;
