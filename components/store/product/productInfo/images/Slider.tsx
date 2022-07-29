import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { MagnifieHelper } from './helpers';
import { handleDragEnd } from 'components/home-page/helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';

const Slider = (props: any) => {
  const [lensDisplay, setLensDisplay] = useState('none');
  const [imgRef, lensRef, setMagnifiedImage] = MagnifieHelper();

  useEffect(
    // TODO add api data and selectedIndex inside of it ie:data[selectedIndex]
    () => setMagnifiedImage(props.selectedIndex),
    [props.selectedIndex],
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

      <AnimatePresence initial={false} custom={props.direction}>
        <SliderImage
          ref={imgRef}
          key={props.page}
          src="/static/backpack.jpg"
          custom={props.direction}
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
            props.page,
            SWIPE_CONFIDENCE_THRESHOLD,
            props.setPage,
          )}
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

const SliderImage = styled(motion.img)`
  width: 95%;
  height: 95%;
  position: absolute;
  left: auto;
  top: auto;
  padding: 20px;
  object-fit: cover;
`;

export default Slider;
