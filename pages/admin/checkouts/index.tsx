import { Spin } from 'antd';
import AdminLayout from 'components/admin/adminLayout/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import CheckoutsTable from '../../../components/admin/checkouts/CheckoutsTable';
import {
  fetchCheckouts,
  clearCheckouts,
} from '../../../redux/slicers/checkoutsSlicer';
import styles from './index.module.scss';

const CheckoutsPage = () => {
  const dispatch = useAppDispatch();
  const checkouts = useAppSelector((state) => state.checkouts.checkouts);
  const isLoading = useAppSelector((state) => state.checkouts.loading);
  const router = useRouter();

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
        <CheckoutsTable checkouts={checkouts} />
      )}
    </>
  );
};

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
