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
import Arrow_right from '../../assets/arrow_right.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';

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
    axios.get('https://fakestoreapi.com/products?limit=7').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const [promo, setPromo] = useState(false);
  const [news, setNews] = useState(false);
  const delay = animation_delay(products.length);
  return (
    <Grid>
      <Subscribe_container
        key="subscribe"
        custom={0.6}
        initial="init"
        whileInView="animate"
        exit="exit"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <Subscribe_wrapper>
          <Subscribe_content>
            <h3>Есть промокод?</h3>
            <form style={{ paddingBottom: '15px' }}>
              <motion.input
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Введите промокод"
              />
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={(e) => {
                  e.preventDefault();
                  setPromo(!promo);
                  setTimeout(() => setPromo(false), 1000);
                }}
              >
                <span>
                  <Arrow_right />
                </span>
              </motion.button>
              <motion.span
                id="alert"
                key="promo-messege"
                animate={promo ? 'animate' : 'exit'}
                variants={variants.fadeOutSlideOut}
              >
                Промокод активирован
              </motion.span>
            </form>
            <hr />
            <h3>Подписывайся</h3>
            <span style={{ textAlign: 'center', width: '90%' }}>
              Подписывайтесь на нашу новостную рассылку
            </span>
            <form>
              <motion.input
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Введите Эл. адрес"
              />
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={(e) => {
                  e.preventDefault();
                  setNews(!news);
                  setTimeout(() => setNews(false), 1000);
                }}
              >
                <span>
                  <Arrow_right />
                </span>
              </motion.button>
              <motion.span
                id="alert"
                key="promo-messege"
                animate={news ? 'animate' : 'exit'}
                variants={variants.fadeOutSlideOut}
              >
                Вы зарегистрированы
              </motion.span>
            </form>
          </Subscribe_content>
        </Subscribe_wrapper>
      </Subscribe_container>
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
        key="section_three"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="row"
        justify_content="space-evenly"
        padding="50px 0 0 0"
        bg_color={color.bg_secondary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
            gap="35px"
          >
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
                <h2>Создано для тебе</h2>
              </Header>
            </AnimatePresence>
            <Content_inner>
              <ProductGrid />
              <Footer
                key="header-messege"
                custom={0.4}
                initial="init"
                whileInView="animate"
                exit="exit"
                viewport={{ once: true }}
                variants={variants.fadInSlideUp}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                  harum nesciunt ipsum debitis quas aliquid
                </p>
                <Link href="#">
                  <motion.a
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                  >
                    <button>Показать все</button>
                  </motion.a>
                </Link>
              </Footer>
            </Content_inner>
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const Content_inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: center;
  gap: 50px;
  border-radius: 30px 30px 0 0;
  background-color: ${color.bg_product};
  padding-bottom: 80px;
`;

const Header = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h2 {
    font-family: intro;
    font-weight: 700;
    font-size: 4rem;
    margin: 0;
    color: ${color.textPrimary};
  }
`;

const Footer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.bg_product};
  p {
    text-align: center;
    width: 60%;
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
  grid-template-areas: 'item item item subscribe';
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 50px 20px;
`;

const Item_container = styled(motion.li)`
  width: 270px;
  height: 450px;
`;

const Subscribe_container = styled(motion.li)`
  grid-area: subscribe;
  width: 270px;
  height: 450px;
`;

const Subscribe_wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Subscribe_content = styled(motion.div)`
  width: 100%;
  height: 320px;
  background-color: ${color.bg_secondary};
  border-radius: 20px;
  box-shadow: 0px 2px 6px ${color.box_shadow};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 0;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
  form {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    position: relative;
    input {
      padding: 0 15px;
      height: 35px;
      border: 1px solid ${color.btnPrimary};
      border-radius: 8px;
      background: ${color.bg_product};
      z-index: 9;
    }
    button {
      width: 35px;
      height: 35px;
      background: ${color.btnPrimary};
      border-radius: 8px;
      span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
    #alert {
      position: absolute;
      top: 40px;
      left: 25px;
    }
  }
  hr {
    width: 100%;
    border: 5px solid ${color.bg_product};
    border-radius: 5px;
  }
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
