import { List, Spin, Typography } from 'antd';
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
          <DynamicPlotPoint data={data} />

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
        </>
      )}
    </div>
  );
};

export default TabPaneContent;
