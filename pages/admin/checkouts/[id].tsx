import AdminLayout from '../../../components/admin/adminLayout/layout';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';
import { CheckoutAllService, CheckoutService } from 'swagger/services';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import styles from './index.module.scss';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { motion } from 'framer-motion';
import { getFormatedDate } from 'components/admin/checkouts/helpers';
import moment from 'moment';
import ProductItem from 'components/admin/checkouts/ProductItem';
import Link from 'next/link';
const CheckoutsPage = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const [isLoading, setLoading] = useState(true);
  const [checkouts, setCheckout]: [any, any] = useState({});
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const response: any = await CheckoutService.findCheckoutById({
        checkoutId: id,
      });
      const checkout = await CheckoutAllService.getCheckoutsAll({
        userId: response.user.id,
      });
      setCheckout(checkout);
      setLoading(false);
    })();
  }, [isOpen]);
  const handleOrderStaus = async (checkoutId: any, status: any) => {
    await CheckoutService.updateCheckout({
      checkoutId,
      body: {
        status,
      },
    });
    const response: any = await CheckoutService.findCheckoutById({
      checkoutId: id,
    });
    const checkout = await CheckoutAllService.getCheckoutsAll({
      userId: response.user.id,
    });
    setCheckout(checkout);
    setOpen(false);
  };
  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Contaienr>
          <Link href="/admin/checkouts">
            <a>
              <GoBackBtn>{`назад`}</GoBackBtn>
            </a>
          </Link>
          {checkouts.rows.map((checkout: any, index) => {
            const orderDate = checkout.createdAt!;
            return (
              <>
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
                      <StatusOptionsParrent>
                        <ChangeStatus onClick={() => setOpen(!isOpen)}>
                          Изменить статус заказа
                        </ChangeStatus>
                        {isOpen ? (
                          <StatusOptionsWappper>
                            <li
                              onClick={() =>
                                handleOrderStaus(
                                  checkout.id,
                                  CheckoutStatus.New,
                                )
                              }
                            >
                              Изменить на (Новый заказ)
                            </li>
                            <li
                              onClick={() =>
                                handleOrderStaus(
                                  checkout.id,
                                  CheckoutStatus.InDelivery,
                                )
                              }
                            >
                              Изменить на (В пути)
                            </li>
                            <li
                              onClick={() =>
                                handleOrderStaus(
                                  checkout.id,
                                  CheckoutStatus.Completed,
                                )
                              }
                            >
                              Изменить на (Завершен)
                            </li>
                            <li
                              onClick={() =>
                                handleOrderStaus(
                                  checkout.id,
                                  CheckoutStatus.Canceled,
                                )
                              }
                            >
                              Изменить на (Отменено)
                            </li>
                          </StatusOptionsWappper>
                        ) : (
                          ''
                        )}
                      </StatusOptionsParrent>
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
                        {checkout.status === CheckoutStatus.New &&
                          'Новый заказ'}
                        {checkout.status === CheckoutStatus.InDelivery &&
                          'В пути'}
                        {checkout.status === CheckoutStatus.Completed &&
                          'Завершен'}
                        {checkout.status === CheckoutStatus.Canceled &&
                          'Отменено'}
                      </h2>
                    </div>
                    {checkout.status !== CheckoutStatus.Completed ? (
                      <span>
                        Заказ до {getFormatedDate(new Date(orderDate))}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="order-details-wrapper">
                    <div className="product-wrapper">
                      {checkout.basket?.orderProducts?.map(
                        (orderProduct, index) => (
                          <ProductItem
                            key={`product-${index}`}
                            orderProduct={orderProduct}
                          />
                        ),
                      )}
                    </div>
                    <div className="order-full-info-wrapper">
                      <div className="order-placed-date">
                        <div className="order-key-value">
                          <span className="key">Дата оформления:</span>
                          <span className="value">
                            {moment(checkout.createdAt).format('DD.MM.YYYY')}
                          </span>
                        </div>
                      </div>
                      <h3 className="order-key-value-header">Способ оплаты</h3>
                      <div className="order-key-value">
                        <span className="key">Картой онлайн:</span>
                        <span className="value">
                          {checkout.totalAmount} ₽, оплачено
                        </span>
                      </div>
                      <h3 className="order-key-value-header">
                        Способ получения
                      </h3>
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
                          {checkout.address?.floor ??
                            `${checkout.address?.floor} этаж, `}
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
                      <div className="order-key-value">
                        <span className="key">Покупатель:</span>
                        <span className="value">
                          {checkout.user.firstName},{checkout.user.lastName} с
                          ID: {checkout.user.id}
                        </span>
                      </div>
                      {checkout.status !== CheckoutStatus.Completed ? (
                        <div className="order-key-value">
                          <span className="key">Дата доставки:</span>
                          <span className="value">
                            До {getFormatedDate(orderDate)}
                          </span>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </Items>
              </>
            );
          })}
        </Contaienr>
      )}
    </>
  );
};

const GoBackBtn = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 15px;
  background-color: #000;
  color: #fff;
  font-family: 'intro';
  font-size: 1rem;
  cursor: pointer;
`;

const StatusOptionsWappper = styled.ul`
  width: 350px;
  background-color: ${color.textPrimary};
  border-radius: 15px;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  display: flex;
  flex-direction: column;
  justify-contetn: flex-start;
  algin-items: center;
  overflow: hidden;
  position: absolute;
  top: 70px;
  right: 0;
  li {
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-family: 'intro';
    padding: 15px;
    color: ${color.btnPrimary};
    &:hover {
      background-color: ${color.textSecondary};
    }
  }
`;

const StatusOptionsParrent = styled.div`
  position: relative;
`;

const ChangeStatus = styled.button`
  padding: 15px;
  border-radius: 15px;
  background-color: #000;
  color: #fff;
  font-family: 'intro';
  font-size: 0.875rem;
  cursor: pointer;
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

const Contaienr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
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
        flex-direction: column;
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

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
