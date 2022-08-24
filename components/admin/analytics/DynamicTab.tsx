import { Tabs } from 'antd';
import { AppContext } from 'common/context/AppContext';
import { useContext } from 'react';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {clearAnalytics, fetchAnalyticsUsers} from 'redux/slicers/analyticsSlicer';
import { handleGetDate } from './helpers';
import NewUsers from './NewUsers';

import TabPaneContent from './TabPaneContent';
import TabPaneWrapper from './TabPaneWrapper';

const { TabPane } = Tabs;

const DynamicTab = ({
  setStep,
  setDateFrom,
  setDateTo,
  isDateChanged,
  dateTo,
  dateFrom,
  currentPage,
  setCurrentPage,
}) => {
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.analytics.loading)

  const handleTabChange = (event) => {
    switch (event) {
      case '2':
        setStep('day');
        dispatch(clearAnalytics())
        if (!isDateChanged) {
          setDateTo(handleGetDate('day', false));
          setDateFrom(handleGetDate('day', true));
        }
        break;
      case '1':
        setStep('month');
        dispatch(clearAnalytics())
        if (!isDateChanged) {
          setDateTo(handleGetDate('month', false));
          setDateFrom(handleGetDate('month', true));
        }
        break;
      case '3':
        setStep('');
        dispatch(clearAnalytics())
        dispatch(
          fetchAnalyticsUsers({
            createdFrom: dateFrom,
            createdTo: dateTo,
            offset: String(offset),
            limit: '20',
          }),
        );
    }
  };

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab={`Объемы продаж по месяцам`} key="1" disabled={isLoading}>
        <TabPaneWrapper>
          <TabPaneContent />
        </TabPaneWrapper>
      </TabPane>
      <TabPane tab="Объемы продаж по дням" key="2" disabled={isLoading}>
        <TabPaneWrapper>
          <TabPaneContent />
        </TabPaneWrapper>
      </TabPane>
      <TabPane tab="Новые пользователи за выбранный период" key="3" disabled={isLoading}>
        <TabPaneWrapper>
          <NewUsers
            dateTo={dateTo}
            dateFrom={dateFrom}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </TabPaneWrapper>
      </TabPane>
    </Tabs>
  );
};

export default DynamicTab;
