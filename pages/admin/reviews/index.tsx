import { Spin } from 'antd';
import AdminLayout from 'components/admin/adminLayout/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import ReviewsTable from '../../../components/admin/reviews/ReviewsTable';
import {
  clearReviews,
  fetchReviews,
} from '../../../redux/slicers/reviewsSlicer';
import styles from './index.module.scss';

const ReviewsPage = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const isLoading = useAppSelector((state) => state.reviews.loading);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchReviews());

    return () => {
      dispatch(clearReviews());
    };
  }, []);

  return (
    <>
      <div className={styles.reviewsHeader}>
        <h1 className={styles.reviewsHeader__title}>Комментарии</h1>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <ReviewsTable reviews={reviews} />
      )}
    </>
  );
};

ReviewsPage.PageLayout = AdminLayout;

export default ReviewsPage;
