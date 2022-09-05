import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { useEffect, useState } from 'react';
import { Checkout } from 'swagger/services';
import moment from 'moment';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import { formatNumber } from 'common/helpers/number.helper';
import { getTotalPrice } from '../cart/helpers';
import ProductItem from './ProductItem';
import { devices } from '../lib/Devices';

type Props = {
  checkout: Checkout;
  index: number;
};
const Orders: React.FC<Props> = ({ checkout, index }) => {
  const [isDeliverFree, setDeliveryFree] = useState(false);

  useEffect(() => {
    setDeliveryFree(true);
  }, []);

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
        <span>Заказ № {checkout.id}</span>
        <div className="order-status">
          <span
            style={{
              backgroundColor:
                checkout.status !== CheckoutStatus.Completed
                  ? color.yellow
                  : color.ok,
            }}
          ></span>
          <h2>
            {/* {` Мы товар собрали и упаковали (order status text is chagable in
                    the admin panel)`} */}
            {checkout.status === CheckoutStatus.New && 'Новый заказ'}
            {checkout.status === CheckoutStatus.InDelivery && 'В пути'}
            {checkout.status === CheckoutStatus.Completed && 'Завершен'}
          </h2>
        </div>
        <span>Заказ будет у вас до пятницу, 12 августа</span>
      </div>
      <div className="order-details-wrapper">
        <div className="product-wrapper">
          {checkout.basket?.orderProducts?.map((orderProduct, index) => (
            <ProductItem key={`product-${index}`} orderProduct={orderProduct} />
          ))}
        </div>
        <div className="order-full-info-wrapper">
          <div className="order-placed-date">
            <div className="order-key-value">
              <span className="key">Дата оформления:</span>
              <span className="value">
                {moment(checkout.createdAt).format('DD.MM.YYYY')}
              </span>
            </div>
            <span>При получении может потребоваться паспорт</span>
          </div>
          <h3 className="order-key-value-header">Способ оплаты</h3>
          <div className="order-key-value">
            <span className="key">Картой онлайн:</span>
            <span className="value">
              {formatNumber(getTotalPrice(checkout.basket?.orderProducts!))} ₽,
              оплачено
            </span>
          </div>
          <h3 className="order-key-value-header">Способ получения</h3>
          <div className="order-key-value">
            <span className="key">Адрес доставки:</span>
            <span className="value">
              {`${checkout.address?.address}, `}
              {checkout.address?.door ?? `${checkout.address?.door} подъезд, `}
              {checkout.address?.floor ?? `${checkout.address?.floor} этаж, `}
              {checkout.address?.floor ?? `${checkout.address?.floor} этаж, `}
              {checkout.address?.rignBell ??
                `${checkout.address?.rignBell} домофон, `}
            </span>
          </div>
          <div className="order-key-value">
            <span className="key">Получатель:</span>
            <span className="value">
              {checkout.address?.receiverName}, тел.{' '}
              {checkout.address?.receiverPhone}
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
          {/* <div className="order-action-btns">
            {checkout.status !== CheckoutStatus.Completed ? (
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                className="danger"
              >
                Отменить заказ
              </motion.button>
            ) : (
              <></>
            )}
          </div> */}
        </div>
      </div>
    </Items>
  );
};

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

    @media ${devices.mobileL} {
      padding: 15px;
    }

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

    @media ${devices.mobileL} {
      flex-direction: column;
      padding: 15px;
    }

    .product-wrapper {
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media ${devices.mobileL} {
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        gap: 15px;
      }

      .product {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        alig-items: center;
        gap: 10px;

        @media ${devices.mobileL} {
          flex-direction: column;

          .image-wrapper {
            height: 130px;
            display: grid;
            align-items: center;
          }

          .product-image-column {
            a {
              display: block;
              text-align: center;
              width: 100%;
            }
            b {
              width: 100%;
            }
            span {
              display: block;
              text-align: center;
              width: 100%;
            }
            .discount {
              display: block;
              text-align: center;
              width: 100%;
            }
          }
        }

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
            font-size: 1rem;
          }
          .discount {
            display: block;
            font-size: 1rem;
            text-decoration: line-through;
            text-decoration-color: ${color.hover};
            color: ${color.textSecondary};
          }
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

      @media ${devices.mobileL} {
        width: 100%;
      }

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
