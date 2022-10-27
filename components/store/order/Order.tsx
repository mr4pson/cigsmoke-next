import { Modal } from 'antd';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import { formatNumber } from 'common/helpers/number.helper';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { cancelCheckout } from 'redux/slicers/store/checkoutSlicer';
import { TStoreCheckoutState } from 'redux/types';
import styled from 'styled-components';
import { Checkout } from 'swagger/services';
import Loading from 'ui-kit/Loading';
import { getTotalPrice } from '../cart/helpers';
import { devices } from '../lib/Devices';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { getFormatedDate, timeCheck } from './helpers';
import { CheckoutService } from 'swagger/services';
import ProductItem from './ProductItem';
import { useRouter } from 'next/router';
type Props = {
  checkout: Checkout;
  index: number;
};

const Orders: React.FC<Props> = ({ checkout, index }) => {
  const orderDate = checkout.createdAt!;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { saveLoading } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onRemoveClick = () => () => {
    setIsModalVisible(true);
  };

  const handleRemove = (checkoutId: string) => async () => {
    setIsModalVisible(false);
    // dispatch(cancelCheckout(paymentId));
    await CheckoutService.updateCheckout({
      checkoutId,
      body: {
        status: CheckoutStatus.Canceled,
      },
    });
    router.push('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment key={index}>
      <Items
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
          <Header>
            Заказ № {checkout.id}.{' '}
            <Price>{(checkout as any)?.totalAmount} ₽</Price>
          </Header>
          <div className="order-status">
            <span
              style={{
                backgroundColor:
                  checkout.status !== CheckoutStatus.Completed
                    ? checkout.status === CheckoutStatus.Canceled
                      ? color.hover
                      : color.yellow
                    : color.ok,
              }}
            ></span>
            <h2>
              {/* {` Мы товар собрали и упаковали (order status text is chagable in
                    the admin panel)`} */}
              {checkout.status === CheckoutStatus.New && 'Новый заказ'}
              {checkout.status === CheckoutStatus.InDelivery && 'В пути'}
              {checkout.status === CheckoutStatus.Completed && 'Завершен'}
              {checkout.status === CheckoutStatus.Canceled && 'Отменено'}
            </h2>
          </div>
          {checkout.status !== CheckoutStatus.Completed ? (
            checkout.status === CheckoutStatus.Canceled ? (
              <></>
            ) : (
              <span>Заказ будет у вас до {getFormatedDate(orderDate)}</span>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="order-details-wrapper">
          <div className="product-wrapper">
            {checkout.basket?.orderProducts?.map((orderProduct, index) => (
              <ProductItem
                key={`product-${index}`}
                orderProduct={orderProduct}
              />
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
              <span className="key">Оплата при доставке:</span>
              <span className="value">
                {(checkout as any)?.totalAmount}
                ₽,{' '}
                {checkout.status === CheckoutStatus.Completed
                  ? 'оплачено'
                  : 'Не оплачено'}
              </span>
            </div>
            <h3 className="order-key-value-header">Способ получения</h3>
            <div className="order-key-value">
              <span className="key">Адрес доставки:</span>
              <span className="value">{`${checkout.address?.address}`}</span>
            </div>
            <div className="order-key-value">
              <span className="key">подъезд</span>
              <span className="value">
                {checkout.address?.door ??
                  `${checkout.address?.door} подъезд, `}
              </span>
            </div>
            <div className="order-key-value">
              <span className="key">этаж</span>
              <span className="value">
                {checkout.address?.floor ?? `${checkout.address?.floor} этаж, `}
              </span>
            </div>
            <div className="order-key-value">
              <span className="key">домофон</span>
              <span className="value">
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
            {checkout.status !== CheckoutStatus.Completed ? (
              checkout.status === CheckoutStatus.Canceled ? (
                <></>
              ) : (
                <div className="order-key-value">
                  <span className="key">Дата доставки:</span>
                  <span className="value">До {getFormatedDate(orderDate)}</span>
                </div>
              )
            ) : (
              <></>
            )}

            {/* <div className="order-key-value">
            <span className="key">Стоимость доставки:</span>
            <span
              style={{
                color: isDeliverFree ? color.ok : color.hover,
              }}
              className="value"
            >
              {`150 ₽`}
            </span>
          </div> */}
            <div className="order-action-btns">
              {!timeCheck(checkout.createdAt) ? (
                checkout.status !== CheckoutStatus.Completed ? (
                  checkout.status === CheckoutStatus.Canceled ? (
                    <></>
                  ) : (
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={variants.boxShadow}
                      className="danger"
                      onClick={onRemoveClick()}
                    >
                      Отменить заказ {saveLoading && <Loading />}
                    </motion.button>
                  )
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Items>
      <Modal
        title={'Вы уверены, что хотите отменить этот заказ?'}
        visible={isModalVisible}
        onOk={handleRemove(checkout.id!)}
        onCancel={handleCancel}
      ></Modal>
    </React.Fragment>
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
        .color-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 10px;
        }
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

const Header = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 1.1rem !important;
  color: #000 !important;
`;

export default Orders;
