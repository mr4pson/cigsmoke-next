import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UserSelectWrapper } from './common';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Cart from '../../../../../assets/added_to_cart.svg';
import CartWhite from '../../../../../assets/cartWhiteEmpty.svg';
import HeartWhite from '../../../../../assets/heartWhiteEmpty.svg';
import HeartFull from '../../../../../assets/heartFullWhite.svg';
import Link from 'next/link';

const ActionBtns = () => {
  const [itemCounter, setItemCounter]: [any, any] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [inFav, setInFav] = useState(false);

  useEffect(() => {
    if (itemCounter === 0) setInCart(false);
  }, [itemCounter]);
  return (
    <UserSelectWrapper margintop="-35px">
      <ActionBtnsWrapper
        key="action-btns-product-page"
        custom={0.3}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
        variants={variants.fadInSlideUp}
      >
        <ActionBtn
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onClick={() => {
            setInCart(true);
            itemCounter == 0 ? setItemCounter(1) : '';
          }}
        >
          <ActionBtnsContentWrapper
            animate={inCart ? 'exit' : 'animate'}
            variants={variants.fadeOutSlideOut}
            style={{ display: inCart ? 'none' : 'flex' }}
          >
            <CartWhite />
            <span>В корзину</span>
          </ActionBtnsContentWrapper>
          <ActionBtnsContentWrapper
            animate={inCart ? 'animate' : 'exit'}
            variants={variants.fadeInSlideIn}
            style={{ display: inCart ? 'flex' : 'none' }}
          >
            <Cart />
            <span style={{ fontSize: '0.7rem' }}>Добавлено в корзину</span>
          </ActionBtnsContentWrapper>
        </ActionBtn>

        <ActionBtn
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onClick={() => {
            setInFav(!inFav);
          }}
        >
          <ActionBtnsContentWrapper
            animate={inFav ? 'exit' : 'animate'}
            variants={variants.fadeOutSlideOut}
            style={{ display: inFav ? 'none' : 'flex' }}
          >
            <HeartWhite />
            <span>В избранное</span>
          </ActionBtnsContentWrapper>
          <ActionBtnsContentWrapper
            animate={inFav ? 'animate' : 'exit'}
            variants={variants.fadeInSlideIn}
            style={{ display: inFav ? 'flex' : 'none' }}
          >
            <HeartFull />
            <span style={{ fontSize: '0.7rem' }}>Добавлено в избранное</span>
          </ActionBtnsContentWrapper>
        </ActionBtn>
      </ActionBtnsWrapper>
      <CounterAndGotoCartWrapper
        animate={inCart ? 'animate' : 'exit'}
        variants={variants.fadeInSlideIn}
        style={{ display: inCart ? 'flex' : 'none' }}
      >
        <CounterWrapper>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={() =>
              setItemCounter(itemCounter < 1 ? 0 : itemCounter - 1)
            }
          >
            <span>-</span>
          </motion.button>
          <input
            style={{ width: itemCounter > 999 ? '50px' : '30px' }}
            onChange={(e) => {
              e.target.value == ''
                ? setItemCounter(e.target.value)
                : setItemCounter(parseInt(e.target.value));
            }}
            value={itemCounter}
            type="number"
            min={0}
          />
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={() =>
              setItemCounter(itemCounter == '' ? 1 : itemCounter + 1)
            }
          >
            <span>+</span>
          </motion.button>
        </CounterWrapper>
        <Link href="/cart">
          <a style={{ justifySelf: 'flex-end' }}>
            <ActionBtn
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
            >
              <span>Перейти в корзине</span>
            </ActionBtn>
          </a>
        </Link>
      </CounterAndGotoCartWrapper>
      <Link href="/checkout">
        <a style={{ justifySelf: 'flex-end' }}>
          <ActionBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
          >
            Купить в один клик
          </ActionBtn>
        </a>
      </Link>
    </UserSelectWrapper>
  );
};

const CounterWrapper = styled(motion.div)`
  width: 110%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  aling-items: center;
  gap: 5px;
  button {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    aling-items: center;
    cursor: pointer;
    span {
      width: 100%;
      height: 100%;
      font-size: 1.4rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  input {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    text-align: center;
    border: 1px solid ${color.btnPrimary};
    background-color: ${color.textPrimary};
    color: ${color.btnPrimary};
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const CounterAndGotoCartWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    width: 100%;
  }
`;

const ActionBtnsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const ActionBtn = styled(motion.button)`
  width: 100%;
  height: 45px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const ActionBtnsContentWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    white-space: nowrap;
  }
`;

export default ActionBtns;
