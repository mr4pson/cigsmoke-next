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
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import { handleWishBtnClick } from '../../components/home-page/helpers';
import { handleHistory } from './helpers';

import {
  UseImagePaginat,
  handleDragEnd,
} from 'components/store/storeLayout/helpers';
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
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const [isWish, setWish] = useState(isInWishlist);

  return (
    <>
      <ImageSliderWrapper>
        <Link href={`/product/${url}`}>
          <a onClick={() => handleHistory(product.id)}>
            <AnimatePresence initial={false} custom={direction}>
              <ImageSlider
                key={`slider-image${imageIndex}`}
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
                // drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={1}
                // onDragEnd={handleDragEnd(
                //   paginateImage,
                //   SWIPE_CONFIDENCE_THRESHOLD,
                // )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1 }}
                alt={product.name}
                src={
                  images[imageIndex]
                    ? `/api/images/${images[imageIndex]}`
                    : '/assets/images/no_photo.png'
                }
              />
            </AnimatePresence>
          </a>
        </Link>

        <ArrowBtns
          key={isWish ? 'heart-full-home-page' : 'heart-empty-home-page'}
          initial="init"
          animate="animate"
          exit="exit"
          variants={isWish ? variants.fadeInSlideIn : variants.fadeOutSlideOut}
          top="15px"
          right="15px"
          topMobile="15px"
          position="absolute"
          bgcolor={color.textPrimary}
          boxshadow={color.boxShadow}
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
          topMobile="195px"
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
          topMobile="260px"
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

  a {
    width: 100%;
    height: 100%;
  }

  @media ${devices.laptopS} {
    width: 220px;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ImageSlider = styled(motion.img)`
  width: 100%;
  height: 100%;
  padding: 10px;
  position: absolute;
  object-fit: contain;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Slider;
