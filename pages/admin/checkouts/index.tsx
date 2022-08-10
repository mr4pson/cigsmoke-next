import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { CheckoutsData } from 'components/admin/checkouts/CheckoutsData.interface';
import { columns } from 'components/admin/checkouts/constants';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import {
  clearCheckouts,
  fetchCheckouts,
} from '../../../redux/slicers/checkoutsSlicer';
import styles from './index.module.scss';

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
      fetchCheckouts({
        offset: String(offset),
        limit: '20',
      }),
    );
    return () => {
      dispatch(clearCheckouts());
      setOffset(0);
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
              fetchCheckouts({
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

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
