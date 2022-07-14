import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../assets/arrow.svg';
import Heart_empty from '../../assets/heart_empty.svg';
import Heart_full from '../../assets/heart_full.svg';
import Cart from '../../assets/added_to_cart.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Wrapper, Content } from './common';

interface props {
  rotate?: string;
  top?: string;
  bg_color?: string;
  box_shadow?: string;
}
const animation_delay = (length: any) => {
  let delay = 0.8;
  let pass_delay: any[] = [];
  for (let i = 0; i < length; i++) {
    switch (delay) {
      case 0.2:
        delay = 0.4;
        break;
      case 0.4:
        delay = 0.6;
        break;
      case 0.6:
        delay = 0.8;
        break;
      default:
        delay = 0.2;
        break;
    }
    pass_delay.push(delay);
  }
  return pass_delay;
};

const swipeConfidenceThreshold = 100;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const AddToCart = () => {
  const [inCart, setInCart] = useState(false);
  return (
    <Cart_btn
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
      onClick={() => {
        setInCart(!inCart);
        setTimeout(() => setInCart(false), 800);
      }}
    >
      <AnimatePresence>
        <motion.span
          key="cart-text"
          animate={inCart ? 'exit' : 'animate'}
          variants={variants.fadeOutSlideOut}
          style={{ position: 'absolute', top: '6px', left: '12px' }}
        >
          В корзину
        </motion.span>
        <motion.span
          key="cart-icon"
          animate={inCart ? 'animate' : 'exit'}
          variants={variants.fadeInSlideIn}
          style={{ position: 'absolute', top: '6px', left: '32px' }}
        >
          <Cart />
        </motion.span>
      </AnimatePresence>
    </Cart_btn>
  );
};

const Slider = (props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, 5, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const [isWish, setWish] = useState(false);

  return (
    <>
      <Image_slider_wrapper>
        <AnimatePresence>
          <Image_slider
            key={page}
            custom={direction}
            variants={variants.slider_product}
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
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Link href={`/${props.url}`}>
              <a>
                <AnimatePresence>
                  <motion.img
                    whileHover="hover"
                    whileTap="tap"
                    custom={1.2}
                    variants={variants.grow}
                    transition={{ ease: 'easeInOut' }}
                    src={props.image}
                  />
                </AnimatePresence>
              </a>
            </Link>
          </Image_slider>
        </AnimatePresence>
        <AnimatePresence>
          {isWish ? (
            <Item_btns
              key="heart-full"
              initial="init"
              animate="animate"
              exit="exit"
              variants={variants.fadeInSlideIn}
              top="15"
              bg_color="transparent;"
              box_shadow={color.textPrimary}
              onClick={() => setWish(!isWish)}
            >
              <Heart_full />
            </Item_btns>
          ) : (
            <Item_btns
              key="heart-empty"
              initial="init"
              animate="animate"
              exit="exit"
              variants={variants.fadeOutSlideOut}
              top="15"
              bg_color="transparent;"
              box_shadow={color.textPrimary}
              onClick={() => setWish(!isWish)}
            >
              <Heart_empty />
            </Item_btns>
          )}
        </AnimatePresence>
        <Item_btns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="210"
          bg_color={color.textPrimary}
          box_shadow={color.box_shadow_btn}
          onClick={() => paginate(1)}
        >
          <Arrow_span rotate="-90">
            <Arrow />
          </Arrow_span>
        </Item_btns>
        <Item_btns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          variants={variants.grow}
          top="270"
          bg_color={color.textPrimary}
          box_shadow={color.box_shadow_btn}
          onClick={() => paginate(-1)}
        >
          <Arrow_span rotate="90">
            <Arrow />
          </Arrow_span>
        </Item_btns>
      </Image_slider_wrapper>
    </>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=12').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const delay = animation_delay(products.length);
  return (
    <Grid>
      <AnimatePresence>
        {products.map((item: any, index: any) => {
          return (
            <Item_container
              key={index}
              custom={delay[index]}
              initial="init"
              whileInView="animate"
              exit="exit"
              viewport={{ once: true }}
              variants={variants.fadInSlideUp}
            >
              <Item_wrapper>
                <Slider image={item.image} url={item.id} />
                <Link href={`/${item.id}`}>
                  <a>
                    <span>{item.title}</span>
                    <Price_wrapper>
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: '800',
                        }}
                      >
                        {item.price}₽
                      </span>
                      <span
                        style={{
                          textDecoration: 'line-through',
                          textDecorationColor: color.hover,
                          textDecorationThickness: '1.5px',
                          color: '#A4A4A4',
                        }}
                      >
                        450
                      </span>
                    </Price_wrapper>
                  </a>
                </Link>
                <AddToCart />
              </Item_wrapper>
            </Item_container>
          );
        })}
      </AnimatePresence>
    </Grid>
  );
};

const Section = () => {
  return (
    <AnimatePresence>
      <Container
        variants={variants.fadInOut}
        key="section_one"
        initial="start"
        animate="middle"
        exit="end"
      >
        <Wrapper>
          <Content>
            <AnimatePresence>
              <Header
                key="header-goods"
                custom={0.2}
                initial="init"
                whileInView="animate"
                exit="exit"
                viewport={{ once: true }}
                variants={variants.fadInSlideUp}
              >
                <h3>Бестселлер этой недели</h3>
                <Link href="#">
                  <motion.a
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                  >
                    <button>Показать все</button>
                  </motion.a>
                </Link>
              </Header>
            </AnimatePresence>
            <ProductGrid />
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 50px 0;
  background-color: ${color.bg_product};
`;

const Header = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
  button {
    width: 130px;
    height: 45px;
    background: ${color.btnPrimary};
    color: ${color.textPrimary};
    border: none;
    border-radius: 8px;
  }
  a {
    border-radius: 8px;
  }
`;

const Grid = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: 35px;
`;

const Item_container = styled(motion.li)`
  width: 270px;
  height: 465px;
`;

const Item_wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  a {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;

    span {
      color: ${color.btnPrimary};
      font-size: 0.875rem;
      text-align: start;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Image_slider_wrapper = styled(motion.div)`
  width: 270px;
  height: 320px;
  background-color: ${color.textPrimary};
  border-radius: 20px;
  box-shadow: 0px 2px 6px ${color.box_shadow};
  position: relative;
  overflow: hidden;
`;
const Image_slider = styled(motion.div)`
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

const Item_btns = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  right: 15px;
  top: ${(p: props) => p.top}px;
  background-color: ${(P: props) => P.bg_color};
  box-shadow: 0px 2px 6px ${(P: props) => P.box_shadow};
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

const Price_wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
`;

const Cart_btn = styled(motion.button)`
  width: 90px;
  height: 35px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  span {
    display: flex;
  }
`;

export default Section;
