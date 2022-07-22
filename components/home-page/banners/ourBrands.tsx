import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ArrowWhite from '../../../assets/arrow_white.svg';
import { ArrowSpan } from './common';
import {
  getFakeImageUrls,
  paginateBrandBack,
  paginateBrandForward,
} from './helpers';

const OurBrands = () => {
  const [width, setWidth] = useState(0);
  const [slideTo, setSlideTo] = useState(0);

  const brandsRef = useRef<any>();
  const imageUrls = getFakeImageUrls();

  useEffect(() => {
    setWidth(brandsRef.current.scrollWidth - brandsRef.current.offsetWidth);
  }, []);

  return (
    <FlexBoxBrandsColumn>
      <AnimatePresence>
        <motion.h3
          key="brand-header"
          custom={0.6}
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadInSlideUp}
        >
          НАШИ БРЕНДЫ
        </motion.h3>
      </AnimatePresence>
      <BrandsWrapper>
        <FlexBoxBrandsRow
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          ref={brandsRef}
          custom={slideTo}
          animate="animate"
          variants={variants.sliderUi}
        >
          <AnimatePresence>
            {imageUrls.map((item, index) => (
              <Link key={index} href="#">
                <a>
                  <BrandsItem
                    key={index}
                    custom={index * 0.1}
                    initial="init"
                    whileInView="animate"
                    exit="exit"
                    src={`/static/${item}`}
                    variants={variants.fadInSlideUp}
                  />
                </a>
              </Link>
            ))}
          </AnimatePresence>
        </FlexBoxBrandsRow>
      </BrandsWrapper>
      <BtnWrapper>
        <ItemBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          onClick={paginateBrandForward(
            slideTo,
            brandsRef,
            setWidth,
            setSlideTo,
          )}
        >
          <ArrowSpan rotate="180">
            <ArrowWhite />
          </ArrowSpan>
        </ItemBtns>
        <ItemBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          onClick={paginateBrandBack(
            slideTo,
            width,
            brandsRef,
            setWidth,
            setSlideTo,
          )}
        >
          <ArrowSpan rotate="0">
            <ArrowWhite />
          </ArrowSpan>
        </ItemBtns>
      </BtnWrapper>
    </FlexBoxBrandsColumn>
  );
};

const FlexBoxBrandsColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 25px;
  position: relative;
  padding: 20px 0 30px;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
`;

const BrandsWrapper = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const FlexBoxBrandsRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const BrandsItem = styled(motion.img)`
  width: 200px;
  height: 100px;
  border-radius: 15px;
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
  background-color: ${color.btnPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default OurBrands;
