import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import isEmpty from 'validator/lib/isEmpty';
import Head from 'next/head';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { TAuthState, TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { getTotalPrice } from 'components/store/checkout/totalDeliveryDate/helpers';
import { formatNumber } from 'common/helpers/number.helper';
import InputMask from 'react-input-mask';

const handleUiInput = (e, setCardNumber) => {
  if (e.nativeEvent.inputType === 'deleteContentBackward') {
    setCardNumber(e.target.value);
    return;
  }
  if (e.target.value.length > 21) return;

  switch (e.target.value.length) {
    case 4:
      setCardNumber(`${e.target.value.slice(0, 4)} `);
      break;
    case 9:
      setCardNumber(`${e.target.value.slice(0, 9)} `);
      break;
    case 14:
      setCardNumber(`${e.target.value.slice(0, 14)} `);
      break;
    default:
      setCardNumber(e.target.value);
      break;
  }
};

const Product = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    !user ? router.push('/') : '';
  }, []);

  const handleFormSubmit = () => {
    const payload = {
      cardNumber,
      cvv,
      month,
      year,
    };

    console.log(payload);
  };

  const checkIfEnabled = () =>
    !isEmpty(cardNumber) && !isEmpty(cvv) && !isEmpty(month) && !isEmpty(year);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container
        flex_direction="column"
        justify_content="space-evenly"
        padding="50px 0"
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="20px"
          >
            <CardForm>
              <Header>
                <h1>Оплата банковской картой</h1>
                <div className="total-payment">
                  <span>Итого с учётом доставки и НДС</span>
                  <h1>{formatNumber(getTotalPrice(cart))} ₽</h1>
                </div>
              </Header>
              <CardWrapper>
                <motion.div
                  custom={0.1}
                  initial="init"
                  animate="animate"
                  variants={variants.fadInSlideUp}
                  className="card-front"
                >
                  <div className="card-imgs">
                    <img src="/static/cards/mir.png" alt="" />
                    <img src="/static/cards/visa.svg" alt="" />
                    <img src="/static/cards/mastercard.svg" alt="" />
                    <img src="/static/cards/mastercard2.svg" alt="" />
                    <img src="/static/cards/american.png" alt="" />
                    <img src="/static/cards/unionpay.png" alt="" />
                  </div>
                  <div className="card-input-wrapper">
                    <span>Номер карты</span>
                    <motion.div
                      whileHover="hover"
                      whileTap="tap"
                      variants={variants.boxShadow}
                    >
                      <InputMask
                        type="text"
                        mask="9999 9999 9999 9999"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        value={cardNumber}
                        maskChar=" "
                        onChange={(e: any) => handleUiInput(e, setCardNumber)}
                        required
                      />
                    </motion.div>
                  </div>
                  <div>
                    <span className="card-date-lable">Действует до</span>
                    <div className="card-date-input-wrapper">
                      <InputMask
                        mask="99"
                        placeholder="MM"
                        value={month}
                        maskChar=" "
                        onChange={(e) => setMonth(e.target.value)}
                        required
                      />

                      <InputMask
                        mask="99"
                        placeholder="ГГ"
                        value={year}
                        maskChar=" "
                        onChange={(e) => setYear(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  custom={0.2}
                  initial="init"
                  animate="animate"
                  variants={variants.fadInSlideUp}
                  className="card-back"
                >
                  <div className="card-back-strip"></div>
                  <div className="secret-code-Wrapper">
                    <b>
                      <span>CCV/CVC</span>
                    </b>
                    <InputMask
                      mask="999"
                      placeholder="000"
                      value={cvv}
                      maskChar=" "
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>
              </CardWrapper>
              <SaveCardWrapper>
                <input type="checkbox" />
                <span>Запомнить карту. Это безопасно. </span>
              </SaveCardWrapper>
              <PayBtn
                type="submit"
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                style={{
                  backgroundColor: !checkIfEnabled()
                    ? color.textSecondary
                    : color.btnPrimary,
                }}
                disabled={!checkIfEnabled()}
                onClick={handleFormSubmit}
              >
                Оплатить {formatNumber(getTotalPrice(cart))} ₽
              </PayBtn>
            </CardForm>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const Header = styled(motion.div)`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  h1 {
    font-size: 2rem;
    font-weight: 900;
  }
  .total-payment {
    span {
      color: ${color.textSecondary};
    }
  }
`;

const CardForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const CardWrapper = styled.div`
  width: 600px;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-contetn: center;
  align-items: center;
  .card-front {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0px 2px 6px ${color.boxShadowBtn};
    background-color: ${color.textPrimary};
    padding: 30px;
    border-radius: 15px;
    z-index: 4;
    .card-imgs {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      img {
        width: 45px;
      }
    }
    .card-input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;
      span {
        color: ${color.textSecondary};
      }
      input {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border-radius: 5px;
        font-size: 1.4rem;
      }
    }
    .card-date-lable {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      color: ${color.textSecondary};
    }
    .card-date-input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      input {
        width: 50px;
        height: 40px;
        padding: 0 5px;
        border-radius: 5px;
        font-size: 1.4rem;
        text-align: center;
      }
    }
  }
  .card-back {
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${color.bgProduct};
    box-shadow: 0px 2px 6px ${color.boxShadowBtn};
    margin-left: -20px;
    border-radius: 15px;
    gap: 10px;
    .secret-code-Wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      input {
        width: 50px;
        height: 40px;
        padding: 0 5px;
        border-radius: 5px;
        font-size: 1.4rem;
        text-align: center;
      }
    }
    .card-back-strip {
      width: 100%;
      height: 60px;
      background-color: ${color.textTertiary};
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 40px;
    }
  }
`;

const SaveCardWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const PayBtn = styled(motion.button)`
  width: 50%;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  color: ${color.textPrimary};
  font-family: 'intro';
  font-size: 1.3rem;
`;

Product.PageLayout = StoreLayout;
export default Product;
