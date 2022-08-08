import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import isEmpty from 'validator/lib/isEmpty';
import Link from 'next/link';
import Discount from '../../../../assets/discount.svg';
import ArrowRight from '../../../../assets/arrow_right.svg';

const TotalDetails = () => {
  const [discount, setDiscount] = useState('');
  const [success, setSuccess] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  return (
    <Container>
      <h3 className="total-header">Ваша сумма</h3>
      <Wrapper>
        <Content>
          <ItemColumn>
            <Link href="/checkout/payment">
              <a>
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                >
                  Оплатить онлайн
                </motion.button>
              </a>
            </Link>
            <span>
              Нажимая на кнопку, вы соглашаетесь с{' '}
              <Link href="/privacy">
                <a>Условиями обработки перс. данных</a>
              </Link>
              , а также с{' '}
              <Link href="/policy">
                <a>Условиями продажи</a>
              </Link>
            </span>
          </ItemColumn>
          <ItemRowWrapper>
            <ItemRow>
              <h3>Ваш заказ</h3>
              <span className="product-wheight">
                {`1`} товар • {`400`} гр
              </span>
            </ItemRow>
            <ItemRow>
              <span>Товары</span>
              <b>
                <span>{`10 000`} ₽</span>
              </b>
            </ItemRow>
            <ItemRow>
              <span>Скидка</span>
              <b>
                <span style={{ color: color.hover }}>{`- 7 00`} ₽</span>
              </b>
            </ItemRow>
            <ItemRow>
              <span>Стоимость доставки</span>
              <b>
                <span>{`100`} ₽</span>
              </b>
            </ItemRow>
          </ItemRowWrapper>
          <ItemRow>
            <h3 className="total">Итого</h3>
            <h3 className="total">{`3 899`} ₽</h3>
          </ItemRow>
        </Content>
      </Wrapper>
      <Wrapper>
        <ItemRow>
          <span className="disount-svg">
            <Discount />
          </span>
          <TextField
            fullWidth
            label="Промокод"
            multiline
            rows={1}
            value={discount}
            defaultValue=""
            onChange={(e) => setDiscount(e.target.value)}
          />
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            disabled={isEmpty(discount) ? true : false}
            style={{
              backgroundColor: isEmpty(discount)
                ? color.textSecondary
                : color.btnPrimary,
            }}
            onClick={() => {
              setSuccess(true);
              setPromoMessage('Успешно');
              setTimeout(() => {
                setSuccess(false);
                setPromoMessage('');
              }, 1000);
            }}
            className="promo-btn"
          >
            <ArrowRight />
          </motion.button>
        </ItemRow>
        <span
          className="promo-message"
          style={{
            color: success ? color.ok : color.hover,
          }}
        >
          {promoMessage}
        </span>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  position: sticky;
  top: 0;
  .total-header {
    font-family: 'intro';
    color: ${color.textSecondary};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  .promo-message {
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const ItemColumn = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  a {
    width: 100%;
    button {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      background-color: ${color.ok};
      color: ${color.textPrimary};
      font-family: 'intro';
    }
  }
  span {
    color: ${color.textSecondary};
    a {
      color: ${color.yellow};
      &:hover {
        color: ${color.hover};
      }
    }
  }
`;

const ItemRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  padding: 10px 0;
`;

const ItemRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  h3 {
    font-size: 1rem;
    font-weight: 800;
  }
  .product-wheight {
    color: ${color.textTertiary};
  }
  .total {
    font-family: 'intro';
    font-size: 1.1rem;
  }
  .disount-svg {
    display: flex;
    flex-direction: row;
    justify-contetn: center;
    align-items: center;
  }

  .promo-btn {
    width: 50px;
    min-width: 50px;
    height: 55px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default TotalDetails;
