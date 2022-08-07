import { Tabs } from 'antd';
import { useAppDispatch } from 'redux/hooks';
import { fetchAnalyticsUsers } from 'redux/slicers/analyticsSlicer';
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
}) => {
  const dispatch = useAppDispatch();

  const handleTabChange = (event) => {
    switch (event) {
      case '2':
        setStep('day');
        if (!isDateChanged) {
          setDateTo(handleGetDate('day', false));
          setDateFrom(handleGetDate('day', true));
        }
        break;
      case '1':
        setStep('month');
        if (!isDateChanged) {
          setDateTo(handleGetDate('month', false));
          setDateFrom(handleGetDate('month', true));
        }
        break;
      case '3':
        setStep('');
        dispatch(
          fetchAnalyticsUsers({
            createdFrom: dateFrom,
            createdTo: dateTo,
          }),
        );
    }
  };

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab={`Объемы продаж по месяцам`} key="1">
        <TabPaneWrapper>
          <TabPaneContent />
        </TabPaneWrapper>
      </TabPane>
      <TabPane tab="Объемы продаж по дням" key="2">
        <TabPaneWrapper>
          <TabPaneContent />
        </TabPaneWrapper>
      </TabPane>
      <TabPane tab="Новые пользователи за выбранный период" key="3">
        <TabPaneWrapper>
          <NewUsers />
        </TabPaneWrapper>
      </TabPane>
    </Tabs>
  );
};

export default DynamicTab;
