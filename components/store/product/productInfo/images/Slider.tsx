import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { MagnifieHelper } from './helpers';
import { SliderImage } from '../../common';
import { handleDragEnd } from './helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';

type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: any;
  direction: number;
  page: number;
  paginateImage: any;
  alt: any;
};

const Slider: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  direction,
  page,
  paginateImage,
  alt,
}) => {
  const [lensDisplay, setLensDisplay] = useState('none');
  const [imgRef, lensRef, setMagnifiedImage] = MagnifieHelper(
    images[selectedIndex],
  );

  useEffect(
    // TODO add api data and selectedIndex inside of it ie:data[selectedIndex]
    () => setMagnifiedImage(selectedIndex),
    [selectedIndex],
  );

  return (
    <SliderWrapper
      key="slider-product-page"
      custom={0.3}
      initial="init"
      animate="animate"
      exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
      variants={variants.fadInSlideUp}
      onMouseOver={() => setLensDisplay('flex')}
      onMouseLeave={() => setLensDisplay('none')}
    >
      <Lens ref={lensRef} style={{ display: lensDisplay }}></Lens>

      <AnimatePresence initial={false} custom={direction}>
        <SliderImage
          ref={imgRef}
          key={page}
          src={`/api/images/${images[selectedIndex]}`}
          alt={alt}
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
            paginateImage,
            SWIPE_CONFIDENCE_THRESHOLD,
            images.length - 1,
            setSelectedIndex,
            selectedIndex,
          )}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/assets/images/no_photo.png';
          }}
        />
      </AnimatePresence>
    </SliderWrapper>
  );
};

const SliderWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  position: relative;
  overflow: hidden;
`;

const Lens = styled(motion.div)`
  z-index: 2;
  position: absolute;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-repeat: no-repeat;
  cursor: none;
`;

export default Slider;
