import { Col, Row, Spin } from 'antd';
import {
  AnalyticsBrand,
  AnalyticsCategory,
  AnalyticsProduct,
} from 'common/interfaces/data-analytics.interfaces';
import { items } from 'components/admin/adminLayout/constants';
import AdminLayout from 'components/admin/adminLayout/layout';
import AmountDonut from 'components/admin/analytics/AmountDonut';
import AvgRatingColumns from 'components/admin/analytics/AvgRatingColumns';
import ColContainer from 'components/admin/analytics/ColContainer';
import QtyPie from 'components/admin/analytics/QtyPie';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearAnalytics,
  fetchAnalyticsBrands,
  fetchAnalyticsCategories,
  fetchAnalyticsProducts,
  fetchAnalyticsUsers,
} from 'redux/slicers/analyticsSlicer';
import styles from './index.module.scss';

const Analytics = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.analytics.categories);
  const isCategoriesLoaded = useAppSelector(
    (state) => state.analytics.categoriesLoading,
  );
  const brands = useAppSelector((state) => state.analytics.brands);
  const isBrandsLoaded = useAppSelector(
    (state) => state.analytics.brandsLoading,
  );
  const products = useAppSelector((state) => state.analytics.products);
  const isProductsLoaded = useAppSelector(
    (state) => state.analytics.productsLoading,
  );
  const users = useAppSelector((state) => state.analytics.users);
  const isUsersLoaded = useAppSelector((state) => state.analytics.usersLoading);

  const handleCategoryData = (
    items: AnalyticsCategory[] | AnalyticsBrand[] | AnalyticsProduct[],
    valueOption: string,
    isUser?: true,
  ): { type: string; value: number }[] => {
    return items.map((item) => {
      if (!isUser) {
        return {
          type: item.name,
          value: item[valueOption],
        };
      }
      return {
        type: `${item.firstName} ${item.lastName}`,
        value: item[valueOption],
      };
    });
  };

  const categoriesQty = handleCategoryData(categories, 'qty');

  const categoriesAmount = handleCategoryData(categories, 'amount');

  const categoriesAvgRating = handleCategoryData(categories, 'avgRating');

  const brandsQty = handleCategoryData(brands, 'qty');

  const brandsAmount = handleCategoryData(brands, 'amount');

  const brandsAvgRating = handleCategoryData(brands, 'avgRating');

  const productsQty = handleCategoryData(products, 'qty');

  const productsAmount = handleCategoryData(products, 'amount');

  const productsAvgRating = handleCategoryData(products, 'avgRating');

  const usersQty = handleCategoryData(users, 'qty', true);

  const usersAmount = handleCategoryData(users, 'amount', true);

  const usersAvgRating = handleCategoryData(users, 'avgRating', true);

  useEffect(() => {
    dispatch(
      fetchAnalyticsCategories({
        groupBy: 'category',
      }),
    );
    dispatch(
      fetchAnalyticsBrands({
        groupBy: 'brand',
      }),
    );
    dispatch(
      fetchAnalyticsProducts({
        groupBy: 'product',
      }),
    );
    dispatch(
      fetchAnalyticsUsers({
        groupBy: 'user',
      }),
    );
    return () => {
      dispatch(clearAnalytics());
    };
  }, []);

  return isCategoriesLoaded &&
    isBrandsLoaded &&
    isProductsLoaded &&
    isUsersLoaded ? (
    <Spin className={styles.spinner} size="large" />
  ) : (
    <>
      <div className={styles.analyticsHeader}>
        <h1 className={styles.analyticsHeader__title}>Аналитика</h1>
      </div>
      <Row
        gutter={[
          {
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
            xl: 40,
            xxl: 48,
          },
          {
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
            xl: 40,
            xxl: 48,
          },
        ]}
        justify="center"
        className={styles.chartsContainer}
      >
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Количество проданных товаров по категориям:</h1>
            </div>
            <QtyPie data={categoriesQty} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Объем продаж по категориям:</h1>
            </div>

            <AmountDonut data={categoriesAmount} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Средний рейтинг товаров по категориям:</h1>
            </div>
            <AvgRatingColumns data={categoriesAvgRating} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Количество проданных товаров по брендам:</h1>
            </div>
            <QtyPie data={brandsQty} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Объем продаж по брендам:</h1>
            </div>

            <AmountDonut data={brandsAmount} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Средний рейтинг товаров по брендам:</h1>
            </div>
            <AvgRatingColumns data={brandsAvgRating} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Количество проданных товаров по отдельности:</h1>
            </div>
            <QtyPie data={productsQty} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Объем продаж по каждому товару:</h1>
            </div>

            <AmountDonut data={productsAmount} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Средний рейтинг каждого товара:</h1>
            </div>
            <AvgRatingColumns data={productsAvgRating} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Количество купленных товаров каждым пользователем:</h1>
            </div>
            <QtyPie data={usersQty} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Сумма покупок каждого пользователя:</h1>
            </div>

            <AmountDonut data={usersAmount} />
          </div>
        </ColContainer>
        <ColContainer>
          <div className={styles.chartsContainer__chart}>
            <div className={styles.chartsContainer__chart__title}>
              <h1>Средние оценки, выставляемые каждым пользователем:</h1>
            </div>
            <AvgRatingColumns data={usersAvgRating} />
          </div>
        </ColContainer>
      </Row>
    </>
  );
};

Analytics.PageLayout = AdminLayout;

export default Analytics;
