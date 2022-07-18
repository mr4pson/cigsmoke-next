import styled from 'styled-components';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { useEffect, useRef, useState } from 'react';
import { images } from './image-data';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../assets/arrow.svg';
import Arrow_white from '../../assets/arrow_white.svg';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';

interface props {
  rotate?: string;
  left?: string;
  right?: string;
}

const swipeConfidenceThreshold = 500;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Section = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const [width, setWidth] = useState(0);
  const brand_width = useRef<any>();

  useEffect(() => {
    setWidth(brand_width.current.scrollWidth - brand_width.current.offsetWidth);
  }, []);

  const [slideTo, setSlideTo] = useState(0);
  const paginate_brand = (newDirection: number) => {
    setWidth(brand_width.current.scrollWidth - brand_width.current.offsetWidth);
    if (newDirection > 0) {
      slideTo > -200 ? setSlideTo(0) : setSlideTo(slideTo + 200);
    } else {
      slideTo < -width + 200 ? setSlideTo(-width) : setSlideTo(slideTo - 200);
    }
  };

  const fake_img_url: any[] = [];
  for (let i = 0; i < 10; i++) {
    fake_img_url.push(`brand-${i}.png`);
  }

  return (
    <AnimatePresence>
      <Container
        variants={variants.fadInOut}
        key="section_one"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="row"
        justify_content="space-evenly"
        padding="42px 0 0 20px"
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
            gap="35px"
          >
            <Grid>
              <AnimatePresence>
                <Slider_wrapper
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
                      src={images[imageIndex]}
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
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }}
                    />
                  </AnimatePresence>
                  <Arrow_btn
                    whileHover="hover"
                    whileTap="tap"
                    custom={1.1}
                    variants={variants.grow}
                    right="15"
                    onClick={() => paginate(1)}
                  >
                    <Arrow_span rotate="0">
                      <Arrow />
                    </Arrow_span>
                  </Arrow_btn>
                  <Arrow_btn
                    whileHover="hover"
                    whileTap="tap"
                    custom={1.1}
                    variants={variants.grow}
                    left="15"
                    onClick={() => paginate(-1)}
                  >
                    <Arrow_span rotate="180">
                      <Arrow />
                    </Arrow_span>
                  </Arrow_btn>
                </Slider_wrapper>
              </AnimatePresence>
              <Flex_box_column>
                <AnimatePresence>
                  <Discount_wrapper
                    key="disount-wrapper"
                    custom={0.2}
                    initial="init"
                    animate="animate"
                    exit="exit"
                    variants={variants.fadeIn}
                  >
                    <AnimatePresence>
                      <Discount_img
                        key="discount-img"
                        custom={0.5}
                        initial="init"
                        animate="animate"
                        exit="exit"
                        src="/static/pm40.webp"
                        variants={variants.fadInSlideUp}
                        whileHover={{
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 1,
                        }}
                      />
                      <motion.h3
                        key="discount-header"
                        custom={0.8}
                        initial="init"
                        animate="animate"
                        exit="exit"
                        variants={variants.fadInSlideUp}
                      >
                        НОВИНКИ
                      </motion.h3>
                      <motion.p
                        key="discount-text"
                        custom={1.1}
                        initial="init"
                        animate="animate"
                        exit="exit"
                        variants={variants.fadInSlideUp}
                      >
                        Только в этом сезонe действует скидка на Vaperesso Luxe
                      </motion.p>
                      <Link href="/">
                        <motion.a
                          whileHover="hover"
                          whileTap="tap"
                          variants={variants.boxShadow}
                        >
                          <AnimatePresence>
                            <motion.button
                              key="discount-btn"
                              custom={1.4}
                              initial="init"
                              animate="animate"
                              exit="exit"
                              variants={variants.fadInSlideUp}
                            >
                              Посмотреть
                            </motion.button>
                          </AnimatePresence>
                        </motion.a>
                      </Link>
                    </AnimatePresence>
                  </Discount_wrapper>
                </AnimatePresence>
              </Flex_box_column>
            </Grid>
            <Flex_box_brands_column>
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
              <Brands_wrapper>
                <Flex_box_brands_row
                  drag="x"
                  dragConstraints={{ right: 0, left: -width }}
                  ref={brand_width}
                  custom={slideTo}
                  animate="animate"
                  variants={variants.sliderUi}
                >
                  <AnimatePresence>
                    {fake_img_url.map((item, index) => (
                      <Link key={index} href="#">
                        <a>
                          <Brands_item
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
                </Flex_box_brands_row>
              </Brands_wrapper>
              <Btn_wrapper>
                <Item_btns
                  whileHover="hover"
                  whileTap="tap"
                  custom={1.2}
                  variants={variants.grow}
                  onClick={() => paginate_brand(1)}
                >
                  <Arrow_span rotate="180">
                    <Arrow_white />
                  </Arrow_span>
                </Item_btns>
                <Item_btns
                  whileHover="hover"
                  whileTap="tap"
                  custom={1.2}
                  variants={variants.grow}
                  onClick={() => paginate_brand(-1)}
                >
                  <Arrow_span rotate="0">
                    <Arrow_white />
                  </Arrow_span>
                </Item_btns>
              </Btn_wrapper>
            </Flex_box_brands_column>
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  place-items: flex-start;
  gap: 40px;
`;

const Slider_wrapper = styled(motion.div)`
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

const Arrow_btn = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  left: ${(p: props) => p.left}px;
  right: ${(p: props) => p.right}px;
  top: auto;
  background-color: ${color.textPrimary};
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Arrow_span = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: rotate(${(p: props) => p.rotate}deg);
`;

const Flex_box_column = styled.div`
  width: 100%;
  height: 462px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 9;
`;

const Discount_wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.bg_secondary};
  border-radius: 25px;
  gap: 15px;
  padding: 20px;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    width: 160px;
    text-align: center;
    margin: 0;
    font-size: 15px;
    font-weight: 500;
  }
  button {
    width: 130px;
    height: 45px;
    background: ${color.btnPrimary};
    color: ${color.textPrimary};
    border: none;
    border-radius: 8px;
    align-items: center;
  }
  a {
    border-radius: 8px;
  }
`;

const Discount_img = styled(motion.img)`
  width: 149px;
  border-radius: 25px;
`;

const Flex_box_brands_column = styled.div`
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

const Brands_wrapper = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const Flex_box_brands_row = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Brands_item = styled(motion.img)`
  width: 200px;
  height: 100px;
  border-radius: 15px;
`;

const Btn_wrapper = styled.div`
  width: 100%;
  display: flex;
  flext-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`;

const Item_btns = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${color.btnPrimary};
  box-shadow: 0px 2px 6px ${color.box_shadow_btn};
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Section;
