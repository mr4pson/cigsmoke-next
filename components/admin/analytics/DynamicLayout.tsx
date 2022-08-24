import { Col, DatePicker, Row, Space } from 'antd';
import { AppContext } from 'common/context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearAnalytics,
  fetchAnalyticsUsers,
} from 'redux/slicers/analyticsSlicer';

import DynamicTab from './DynamicTab';
import {
  handleChangeDate,
  handleDynamicAnalyticsDispatch,
  handleGetDate,
} from './helpers';
import styles from './index.module.scss';
import NewUsers from './NewUsers';

const { RangePicker } = DatePicker;
const DynamicLayout = () => {
  const [step, setStep] = useState('month');
  const [dateTo, setDateTo] = useState<string>(handleGetDate(step, false));
  const [dateFrom, setDateFrom] = useState<string>(handleGetDate(step, true));
  const [isDateChanged, setIsDateChanged] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();

  const isLoaded = useAppSelector((state) => state.analytics.loading);

  useEffect(() => {
    if (step) {
      handleDynamicAnalyticsDispatch(dispatch, dateFrom, dateTo, step);
    }
    return () => {
      dispatch(clearAnalytics());
    };
  }, [step]);

  useEffect(() => {
    if (step) {
      handleDynamicAnalyticsDispatch(dispatch, dateFrom, dateTo, step);
      return;
    } else if (step === '') {
      dispatch(
        fetchAnalyticsUsers({
          createdFrom: dateFrom,
          createdTo: dateTo,
          offset: '0',
          limit: '20',
        }),
      );
      setCurrentPage(1);
    }
  }, [dateTo, dateFrom]);

  return (
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
      >
        <Col span={24}>
          <div>
            <Space className={styles.dynamicChartContainer__title}>
              <h1>Динамические данные</h1>
            </Space>
            <RangePicker
              format="DD/MM/YYYY"
              disabled={isLoaded}
              className={styles.dynamicChartContainer__rangePicker}
              onChange={(event) => {
                console.log('Date changed!');
                setIsDateChanged(true);
                handleChangeDate(event, setDateFrom, setDateTo);
              }}
            />
          </div>
          <DynamicTab
            setStep={setStep}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            isDateChanged={isDateChanged}
            dateFrom={dateFrom}
            dateTo={dateTo}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default DynamicLayout;
