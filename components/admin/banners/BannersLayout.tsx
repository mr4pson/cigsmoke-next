import { Tabs } from 'antd';
import { useAppSelector } from 'redux/hooks';
import AdvertisementTab from './AdvertisementTab';
import SlidesTab from './SlidesTab';

const { TabPane } = Tabs;

interface Props {
  setCurrentTab;
}

const BannersLayout = ({ setCurrentTab }: Props) => {
  const isLoading = useAppSelector((state) => state.banners.loading);

  return (
    <>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={(e) => {
            setCurrentTab(e);
          }}
        >
          <TabPane tab="Реклама" key="1">
            <AdvertisementTab isLoading={isLoading} />
          </TabPane>
          <TabPane tab="Баннеры" key="2">
            <SlidesTab isLoading={isLoading} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default BannersLayout;
