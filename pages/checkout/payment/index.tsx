import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import isEmpty from 'validator/lib/isEmpty';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';

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
  const reRoute = useRouter();
  const [isAuthorized, setAuthorized] = useState(true);
  const [cardNumber, setCardNumber]: [any, any] = useState('');
  useEffect(() => {
    !isAuthorized ? reRoute.push('/') : '';
  }, []);

  return (
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
          <Header>
            <h1>Оплата банковской картой</h1>
            <div className="total-payment">
              <span>Итого с учётом доставки и НДС</span>
              <h1>{`4000`}</h1>
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
                <motion.input
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  type="text"
                  value={cardNumber}
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  onChange={(e: any) => handleUiInput(e, setCardNumber)}
                />
              </div>
              <div>
                <span className="card-date-lable">Действует до</span>
                <div className="card-date-input-wrapper">
                  <input placeholder="ММ" type="text" />

                  <input placeholder="ГГ" type="text" />
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
                <input placeholder="000" type="text" />
              </div>
            </motion.div>
          </CardWrapper>
          <SaveCardWrapper>
            <input type="checkbox" />
            <span>Запомнить карту. Это безопасно. </span>
          </SaveCardWrapper>
          <PayBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            style={{
              backgroundColor: isEmpty(cardNumber)
                ? color.textSecondary
                : color.btnPrimary,
            }}
            disabled={isEmpty(cardNumber) ? true : false}
          >
            Оплатить {`15 000`} ₽
          </PayBtn>
        </Content>
      </Wrapper>
    </Container>
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
