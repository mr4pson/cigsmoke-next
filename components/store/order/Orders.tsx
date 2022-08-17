import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { useEffect, useState } from 'react';

const data = generateArrayOfNumbers(3);

const Orders = () => {
  const [isDeliverFree, setDeliveryFree] = useState(false);
  const [orederStatus, setStatus] = useState('inProgress'); //  isShiped,
  useEffect(() => {
    setDeliveryFree(true);
  }, []);
  return (
    <OrdersWrapper>
      {data.map((order, index) => {
        return (
          <Items
            key={index}
            custom={index * 0.05}
            initial="init"
            animate="animate"
            exit={{
              y: -60,
              opacity: 0,
              transition: { delay: index * 0.05 },
            }}
            variants={variants.fadInSlideUp}
          >
            <div className="order-status-wrapper">
              <span>Заказ № 127652655</span>
              <div className="order-status">
                <span
                  style={{
                    backgroundColor:
                      orederStatus == 'inProgress' ? color.yellow : color.ok,
                  }}
                ></span>
                <h2>
                  {` Мы товар собрали и упаковали (order status text is chagable in
                    the admin panel)`}
                </h2>
              </div>
              <span>Заказ будет у вас до пятницу, 12 августа</span>
            </div>
            <div className="order-details-wrapper">
              <div className="product-image-wrapper">
                <img src="/static/backpack.jpg" alt="" />
                <div className="product-image-column">
                  <Link href="/product/id">
                    <a>
                      Стол компьютерный Мама Умный Венге темный Стол
                      компьютерный Мама Умный Венге темный
                    </a>
                  </Link>
                  <b>
                    <span>1 890 ₽</span>
                    <span className="discount">2 279 ₽</span>
                  </b>
                </div>
              </div>
              <div className="order-full-info-wrapper">
                <div className="order-placed-date">
                  <div className="order-key-value">
                    <span className="key">Дата оформления:</span>
                    <span className="value">9 августа</span>
                  </div>
                  <span>При получении может потребоваться паспорт</span>
                </div>
                <h3 className="order-key-value-header">Способ оплаты</h3>
                <div className="order-key-value">
                  <span className="key">Картой онлайн:</span>
                  <span className="value">1 890 ₽, оплачено</span>
                </div>
                <h3 className="order-key-value-header">Способ получения</h3>
                <div className="order-key-value">
                  <span className="key">Адрес доставки:</span>
                  <span className="value">
                    рабочий посёлок Томилино, микрорайон Птицефабрика, д. 22, 6,
                    1 подъезд, 2 этаж, домофон 6в
                  </span>
                </div>
                <div className="order-key-value">
                  <span className="key">Получатель:</span>
                  <span className="value">
                    Mohammadi Rishad, тел. +7 999 999-99-99
                  </span>
                </div>
                <div className="order-key-value">
                  <span className="key">Дата доставки:</span>
                  <span className="value">До пятницу, 12 августа</span>
                </div>
                <div className="order-key-value">
                  <span className="key">Стоимость доставки:</span>
                  <span
                    style={{
                      color: isDeliverFree ? color.ok : color.hover,
                    }}
                    className="value"
                  >
                    {`бесплатно`}
                  </span>
                </div>
                <div className="order-action-btns">
                  {/* <motion.button
                        whileHover="hover"
                        whileTap="tap"
                        variants={variants.boxShadow}
                      >
                        chat app
                      </motion.button> */}
                  {orederStatus == 'inProgress' ? (
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={variants.boxShadow}
                      className="danger"
                    >
                      Отменить заказ
                    </motion.button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </Items>
        );
      })}
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.ul`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const Items = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  box-shadow: 0px 2px 6px ${color.boxShadow};

  .order-status-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    padding: 30px;
    border-radius: 15px 15px 0 0;
    background-color: ${color.bgProduct};
    span {
      color: ${color.textSecondary};
      font-size: 1rem;
    }
    .order-status {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      span {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      h2 {
        font-fmaily: 'intro';
        font-size: 1.2rem;
      }
    }
  }
  .order-details-wrapper {
    width: 100%;
    display: flex;
    flex-direciton: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;

    gap: 20px;
    .product-image-wrapper {
      width: 45%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      alig-items: center;
      gap: 10px;
      img {
        width: 100px;
        padding: 5px;
      }
      .product-image-column {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        a {
          &:hover {
            color: ${color.hover};
          }
        }
        span {
          font-family: 'intro';
          padding: 0 5px;
        }
        .discount {
          font-size: 1rem;
          text-decoration: line-through;
          text-decoration-color: ${color.hover};
          color: ${color.textSecondary};
        }
      }
    }

    .order-full-info-wrapper {
      width: 55%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 30px;

      .order-placed-date {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
      }
      .order-key-value-header {
        font-family: 'intro';
      }

      .order-key-value {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        span {
          color: ${color.textSecondary};
        }
        .key {
          width: 100%;
          white-space: nowrap;
        }
        .value {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          color: ${color.btnPrimary};
        }
      }
      .order-action-btns {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        button {
          width: 100%;
          height: 45px;
          border-radius: 10px;
          text-align: center;
          background-color: ${color.btnPrimary};
          color: ${color.textPrimary};
          font-family: 'intro';
        }
        .danger {
          background-color: ${color.hover};
        }
      }
    }
  }
`;

export default Orders;
