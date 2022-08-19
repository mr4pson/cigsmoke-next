import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearBanners,
  fetchAdvertisement,
  fetchSlides,
} from 'redux/slicers/bannersSlicer';
import AdvertisementTab from './AdvertisementTab';
import SlidesTab from './SlidesTab';

const { TabPane } = Tabs;

const BannersLayout = () => {
  const isLoading = useAppSelector((state) => state.banners.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdvertisement());
    return () => {
      dispatch(clearBanners());
    };
  }, []);

  const handleTabChange = (e) => {
    switch (e) {
      case '1':
        dispatch(fetchAdvertisement());
        break;
      case '2':
        dispatch(fetchSlides());
        break;
    }
  };

  return (
    <>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={(e) => {
            handleTabChange(e);
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
