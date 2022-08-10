import { Col, Row, Spin } from 'antd';
import AmountDonut from 'components/admin/analytics/AmountDonut';
import AvgRatingColumns from 'components/admin/analytics/AvgRatingColumns';
import ColContainer from 'components/admin/analytics/ColContainer';
import { handleData } from 'components/admin/analytics/helpers';
import QtyPie from 'components/admin/analytics/QtyPie';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearAnalytics, fetchAnalytics } from 'redux/slicers/analyticsSlicer';
import styles from './index.module.scss';

interface Props {
  option: string;
  isUser: boolean;
  qtyTitle: string;
  amountTitle: string;
  avgRatingTitle: string;
}

const AnalyticsLayout = ({
  option,
  isUser,
  qtyTitle,
  amountTitle,
  avgRatingTitle,
}: Props) => {
  const dispatch = useAppDispatch();
  const analyticsData = useAppSelector(
    (state) => state.analytics.analyticsData,
  );
  const isLoaded = useAppSelector((state) => state.analytics.loading);

  const qtyData = handleData(analyticsData, 'qty', isUser);

  const amountData = handleData(analyticsData, 'amount', isUser);

  const avgRatingData = handleData(analyticsData, 'avgRating', isUser);

  useEffect(() => {
    dispatch(
      fetchAnalytics({
        groupBy: option,
      }),
    );
    return () => {
      dispatch(clearAnalytics());
    };
  }, []);

  return (
    <>
      <div className={styles.analyticsHeader}>
        <h1 className={styles.analyticsHeader__title}>Аналитика</h1>
      </div>
      {isLoaded ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <>
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
                  <h1>{qtyTitle}</h1>
                </div>
                <QtyPie data={qtyData} />
              </div>
            </ColContainer>
            <ColContainer>
              <div className={styles.chartsContainer__chart}>
                <div className={styles.chartsContainer__chart__title}>
                  <h1>{amountTitle}</h1>
                </div>

                <AmountDonut data={amountData} />
              </div>
            </ColContainer>
            <Col span={24}>
              <div className={styles.chartsContainer__chart}>
                <div className={styles.chartsContainer__chart__title}>
                  <h1>{avgRatingTitle}</h1>
                </div>
                <AvgRatingColumns data={avgRatingData} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AnalyticsLayout;
