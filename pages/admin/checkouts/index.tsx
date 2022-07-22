import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { CheckoutsData } from 'components/admin/checkouts/CheckoutsData.interface';
import { columns } from 'components/admin/checkouts/constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { OrderProduct } from 'swagger/services';

import {
  clearCheckouts,
  fetchCheckouts,
} from '../../../redux/slicers/checkoutsSlicer';
import styles from './index.module.scss';

const CheckoutsPage = () => {
  const dispatch = useAppDispatch();
  const checkouts = useAppSelector((state) => state.checkouts.checkouts);
  const isLoading = useAppSelector((state) => state.checkouts.loading);
  const router = useRouter();

  const dataSource = checkouts?.map(
    ({ id, address, payment, basket, ...rest }): CheckoutsData => ({
      key: id as string,
      id: id as string,
      addressName: `Город: ${address?.city},${'\n'}адрес: ${address?.address}`,
      payment: `ID пользователя: ${payment?.userId},${'\n'}номер карты: ${
        payment?.cardNumber
      }`,
      orderedProducts: basket?.orderProducts as OrderProduct,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchCheckouts());

    return () => {
      dispatch(clearCheckouts());
    };
  }, []);

  return (
    <>
      <div className={styles.checkoutsHeader}>
        <h1 className={styles.checkoutsHeader__title}>Заказы</h1>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Table
          columns={
            columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
          }
          dataSource={dataSource}
        />
      )}
    </>
  );
};

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
