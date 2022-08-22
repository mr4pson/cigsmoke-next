import { Col, List, Row, Spin, Typography } from 'antd';
import { useAppSelector } from 'redux/hooks';
import DynamicPlotPoint from './DynamicPlotPoint';
import styles from './index.module.scss';
import { DynamicData } from 'common/interfaces/data-analytics.interfaces';
import { handleDataFormatter, handleDataSorter } from './helpers';

const TabPaneContent = () => {
  const dynamicAnalysis = useAppSelector<DynamicData[]>(
    (state) => state.analytics.analyticsData,
  );
  const isLoaded = useAppSelector((state) => state.analytics.loading);

  const data = handleDataFormatter(dynamicAnalysis);

  const sortedData = handleDataSorter(data);

  return (
    <div>
      {isLoaded ? (
        <Spin className={styles.dynamicChartContainer__spinner} size="large" />
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
          >
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 16 }}
              xl={{ span: 16 }}
              xxl={{ span: 18 }}
            >
              <DynamicPlotPoint data={data} />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
              xxl={{ span: 6 }}
            >
              <List
                size="small"
                className={styles.dynamicChartContainer__list}
                header={<div>Топ 10</div>}
                bordered
                dataSource={sortedData}
                renderItem={(item: DynamicData) => (
                  <List.Item>
                    Дата: {item.date}; прибыль: {item.amount} ₽
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default TabPaneContent;
