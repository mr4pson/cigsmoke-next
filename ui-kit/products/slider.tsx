import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import { useState } from 'react';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Arrow from '../../assets/arrow.svg';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import HeartEmpty from '../../assets/heart_empty.svg';
import HeartFull from '../../assets/heart_full.svg';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../components/home-page/bestsellers/constants';
import {
  handleDragEnd,
  handleWishBtnClick,
} from '../../components/home-page/helpers';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { devices } from 'components/store/lib/Devices';

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
  // const [[page, direction], setPage] = useState([0, 0]);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const [isWish, setWish] = useState(isInWishlist);

  return (
    <>
      <ImageSliderWrapper>
        <AnimatePresence initial={false} custom={direction}>
          <ImageSlider
            key="slider-image-home-page"
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
            <Link href={`/product/${url}`}>
              <a>
                <motion.div
                  key={`slider-image`}
                  whileHover="hover"
                  whileTap="tap"
                  custom={1.2}
                  variants={variants.grow}
                  transition={{ ease: 'easeInOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: images[imageIndex]
                      ? `url(/api/images/${images[imageIndex]})`
                      : 'url(/assets/images/no_photo.png)',
                  }}
                />
              </a>
            </Link>
          </ImageSlider>
        </AnimatePresence>

        <ArrowBtns
          key={isWish ? 'heart-full-home-page' : 'heart-empty-home-page'}
          initial="init"
          animate="animate"
          exit="exit"
          variants={isWish ? variants.fadeInSlideIn : variants.fadeOutSlideOut}
          top="15px"
          right="15px"
          position="absolute"
          bgcolor="transparent;"
          boxshadow={color.textPrimary}
          onClick={handleWishBtnClick(product, setWish, onWishBtnClick)}
        >
          {isWish ? <HeartFull /> : <HeartEmpty />}
        </ArrowBtns>

        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="210px"
          right="15px"
          position="absolute"
          bgcolor={color.textPrimary}
          boxshadow={color.boxShadowBtn}
          onClick={() => paginateImage(1)}
        >
          <ArrowSpan rotate="-90">
            <Arrow />
          </ArrowSpan>
        </ArrowBtns>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="270px"
          right="15px"
          position="absolute"
          bgcolor={color.textPrimary}
          boxshadow={color.boxShadowBtn}
          onClick={() => paginateImage(-1)}
        >
          <ArrowSpan rotate="90">
            <Arrow />
          </ArrowSpan>
        </ArrowBtns>
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

  @media ${devices.laptopS} {
    width: 220px;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
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

export default Slider;
