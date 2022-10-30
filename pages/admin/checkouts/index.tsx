import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { CheckoutsData } from 'components/admin/checkouts/CheckoutsData.interface';
import { columns } from 'components/admin/checkouts/constants';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { axiosInstance } from 'common/axios.instance';
import color from 'components/store/lib/ui.colors';
import styled from 'styled-components';
import {
  clearCheckouts,
  fetchCheckoutsAll,
} from '../../../redux/slicers/checkoutsSlicer';
import styles from './index.module.scss';
import Loading from 'ui-kit/Loading';

const CheckoutsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const checkouts = useAppSelector((state) => state.checkouts.checkouts);
  const isLoading = useAppSelector((state) => state.checkouts.loading);

  const dataSource = checkouts?.map(
    ({ id, user, basket, address, comment, ...rest }): CheckoutsData => ({
      key: id as string,
      id,
      user,
      basket,
      address,
      comment,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchCheckoutsAll({
        offset: String(offset),
        limit: '20',
      }),
    );
    return () => {
      dispatch(clearCheckouts());
      setOffset(0);
    };
  }, []);
  const [isSubed, setSubed] = useState(false);
  const [isLoadingSub, setLoading] = useState(false);
  const subscriber = async () => {
    setLoading(true);
    if ('serviceWorker' in navigator) {
      try {
        if (navigator.serviceWorker.controller) {
          console.log(
            '[PWA Builder] active service worker found, no need to register',
          );
          return;
        }
        const register = await navigator.serviceWorker.register(
          '/static/sw.js',
        );
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            'BHgZBD9sPAjR-YEMwJoULsE5xve8Ezj5XrAw155-KkwksuL6S2CnJt-dddWJg_Q9r_oAEJzQBeOG9oMXz9Sir9Y',
          ),
        });

        const respons = await axiosInstance.post('/checkouts/subscribe', {
          subscriber: JSON.stringify(subscription),
        });
        setSubed(
          respons.status === 200 || respons.status === 202 ? true : false,
        );
        setLoading(false);
        setTimeout(() => setSubed(false), 2000);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  };

  return (
    <>
      <div className={styles.checkoutsHeader}>
        <h1 className={styles.checkoutsHeader__title}>Заказы</h1>
      </div>
      <NotificationSubWrapper>
        <button onClick={subscriber}>
          Подписаться на уведомление{' '}
          {isLoadingSub ? (
            <span>
              <Loading />
            </span>
          ) : (
            ''
          )}
        </button>
        <span>{isSubed ? 'Уведомление установлено' : ''}</span>
      </NotificationSubWrapper>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Table
          scroll={{
            // x: 1366,
            y: 768,
          }}
          pagination={{
            pageSize: 20,
            current: currentPage,
          }}
          columns={
            columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
          }
          dataSource={dataSource}
          onChange={(event) => {
            const newOffset = ((event.current as number) - 1) * 20;
            setOffset(newOffset);
            dispatch(
              fetchCheckoutsAll({
                offset: String(newOffset),
                limit: '20',
              }),
            );
            setCurrentPage(event.current as number);
          }}
        />
      )}
    </>
  );
};

const NotificationSubWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  button {
    padding: 15px;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    border-radius: 10px;
  }
  span {
    color: ${color.ok};
    font-size: 1.5rem;
  }
`;

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
