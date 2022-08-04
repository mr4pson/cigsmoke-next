import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/reviews/constants';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import {
  clearReviews,
  fetchReviews,
} from '../../../redux/slicers/reviewsSlicer';
import styles from './index.module.scss';

const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const isLoading = useAppSelector((state) => state.reviews.loading);

  const dataSource = reviews?.map(
    ({ id, rating, text, product, user, ...rest }) => ({
      key: id,
      id,
      rating,
      text,
      product: product.name,
      email: user.email,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchReviews());
    return () => {
      dispatch(clearReviews());
    };
  }, []);

  return (
    <>
      <div className={styles.reviewsHeader}>
        <h1 className={styles.reviewsHeader__title}>Отзывы</h1>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <>
          <Table
            columns={
              columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
            }
            dataSource={dataSource}
          />
        </>
      )}
    </>
  );
};

ReviewsPage.PageLayout = AdminLayout;

export default ReviewsPage;
