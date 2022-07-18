import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Rating } from '@mui/material'; // docs: https://mui.com/material-ui/api/rating/ *** https://mui.com/material-ui/react-rating/
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../assets/arrow.svg';
import { useEffect, useState, useRef } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
const data = [1, 2, 3, 4, 5];
const stars = [{ rate: 4 }, { rate: 5 }, { rate: 5 }, { rate: 5 }, { rate: 4 }];
interface props {
  rotate?: string;
}

const Section = () => {
  const [width, setWidth] = useState(0);
  const wrapper_width = useRef<any>();
  const [slideTo, setSlideTo] = useState(0);
  const paginate = (newDirection: number) => {
    setWidth(
      wrapper_width.current.scrollWidth - wrapper_width.current.offsetWidth,
    );
    if (newDirection > 0) {
      slideTo > -150 ? setSlideTo(0) : setSlideTo(slideTo + 150);
    } else {
      slideTo < -width + 150 ? setSlideTo(-width) : setSlideTo(slideTo - 150);
    }
  };

  useEffect(() => {
    setWidth(
      wrapper_width.current.scrollWidth - wrapper_width.current.offsetWidth,
    );
  }, []);

  return (
    <AnimatePresence>
      <Container
        variants={variants.fadInOut}
        key="section_four"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="row"
        justify_content="space-evenly"
        padding="50px 0"
        bg_color="#1e1e1e"
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
            gap="35px"
          >
            <Header>
              <h4>Пусть клиенты</h4>
              <h3>Говорит за нас</h3>
            </Header>
            <Flex_wrapper>
              <Flex
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                ref={wrapper_width}
                custom={slideTo}
                animate="animate"
                variants={variants.sliderUi}
              >
                <AnimatePresence>
                  {data.map((item, index) => {
                    return (
                      <Item_container
                        key={index}
                        custom={index * 0.1}
                        initial="init"
                        whileInView="animate"
                        exit="exit"
                        viewport={{ once: true }}
                        variants={variants.fadInSlideUp}
                      >
                        <Star_wrapper
                          key={index}
                          custom={0.4}
                          initial="init"
                          whileInView="animate"
                          viewport={{ once: true }}
                          variants={variants.fadInSlideUp}
                        >
                          <Rating
                            value={stars[index].rate}
                            size="small"
                            readOnly
                          />
                        </Star_wrapper>
                        <h3>Качественный товар</h3>
                        <p>
                          всё как ожидалось... покупкой довольна. Хороший
                          настольный вентилятор. Работает не шумно, есть
                          несколько режимом. Рекомендую
                        </p>
                        <div id="user">
                          <span>7 Июля 2022</span>
                          <span>Иван а.</span>
                        </div>
                        <Link href="/">
                          <a>
                            <motion.img
                              whileHover="hover"
                              whileTap="tap"
                              custom={1.2}
                              variants={variants.grow}
                              src="/static/backpack.jpg"
                            />
                          </a>
                        </Link>
                      </Item_container>
                    );
                  })}
                </AnimatePresence>
              </Flex>
            </Flex_wrapper>
            <Btn_wrapper>
              <Item_btns
                whileHover="hover"
                whileTap="tap"
                custom={1.2}
                variants={variants.grow}
                onClick={() => paginate(1)}
              >
                <Arrow_span rotate="180">
                  <Arrow />
                </Arrow_span>
              </Item_btns>
              <Item_btns
                whileHover="hover"
                whileTap="tap"
                custom={1.2}
                variants={variants.grow}
                onClick={() => paginate(-1)}
              >
                <Arrow_span rotate="0">
                  <Arrow />
                </Arrow_span>
              </Item_btns>
            </Btn_wrapper>
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h4 {
    font-size: 1.5rem;
    color: ${color.textPrimary};
  }
  h3 {
    font-size: 2.5rem;
    color: ${color.yellow};
  }
`;

const Flex_wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  cursor: grab;
`;

const Flex = styled(motion.ul)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 33px;
`;

const Item_container = styled(motion.li)`
  min-width: 270px;
  height: 320px;
  background-color: ${color.textPrimary};
  border-radius: 20px;
  box-shadow: 0px 2px 6px ${color.box_shadow};
  diplay: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  h3 {
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
  }
  p {
    width: 100%;
    text-align: left;
    font-size: 0.8rem;
  }
  #user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    aling-items: center;
    color: ${color.rating_empty};
  }
  a {
    align-self: center;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const Star_wrapper = styled(motion.div)`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
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
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.box_shadow};
  z-index: 9;
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

export default Section;
