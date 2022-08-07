import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import ArrowWhite from '../../../assets/arrow_white.svg';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { getFakeImageUrls } from './helpers';

const OurBrands = () => {
  const imageUrls = getFakeImageUrls();

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
    setSlideAmount(200);
  }, []);

  return (
    <FlexBoxBrandsColumn>
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

      <BrandsWrapper>
        <FlexBoxBrandsRow
          drag="x"
          dragConstraints={{ right: 0, left: -widthOrHeight }}
          ref={widthOrHeightRef}
          custom={slideTo}
          animate="animate"
          variants={variants.sliderX}
        >
          {imageUrls.map((item, index) => (
            <Link key={index} href={`/catalog/id`}>
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
        </FlexBoxBrandsRow>
      </BrandsWrapper>
      <BtnWrapper>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          bgcolor={color.btnPrimary}
          boxshadow={color.boxShadowBtn}
          onClick={() => paginate(1)}
        >
          <ArrowSpan rotate="180">
            <ArrowWhite />
          </ArrowSpan>
        </ArrowBtns>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          bgcolor={color.btnPrimary}
          boxshadow={color.boxShadowBtn}
          onClick={() => paginate(-1)}
        >
          <ArrowSpan rotate="0">
            <ArrowWhite />
          </ArrowSpan>
        </ArrowBtns>
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

export default OurBrands;
