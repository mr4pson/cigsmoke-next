import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Advertisement } from 'swagger/services';
import AdvertisementForm from './AdvertisementForm';
import SlidesForm from './SlidesForm';

const { TabPane } = Tabs;

interface Props {
  setCurrentTab;
  initialValues;
  imageList;
}

const BannersFormLayout = ({
  setCurrentTab,
  initialValues,
  imageList,
}: Props) => {
  const isSaveLoading = useAppSelector((state) => state.banners.saveLoading);
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
            <AdvertisementForm
              isSaveLoading={isSaveLoading}
              isLoading={isLoading}
              initialValues={initialValues}
              imageList={imageList}
            />
          </TabPane>
          <TabPane tab="Баннеры" key="2">
            <SlidesForm
              isSaveLoading={isSaveLoading}
              isLoading={isLoading}
              initialValues={initialValues}
              imageList={imageList}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default BannersFormLayout;
