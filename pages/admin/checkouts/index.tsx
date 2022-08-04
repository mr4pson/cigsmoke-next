import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { CheckoutsData } from 'components/admin/checkouts/CheckoutsData.interface';
import { columns } from 'components/admin/checkouts/constants';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import {
  clearCheckouts,
  fetchCheckouts,
} from '../../../redux/slicers/checkoutsSlicer';
import styles from './index.module.scss';

const CheckoutsPage = () => {
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
    dispatch(fetchCheckouts());
    console.log(checkouts);
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
