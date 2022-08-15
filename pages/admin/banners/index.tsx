import { Button, Spin } from 'antd';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';
import BannersLayout from 'components/admin/banners/BannersLayout';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';

import {
  clearBanners,
  fetchAdvertisement,
  fetchSlides,
} from '../../../redux/slicers/bannersSlicer';
import styles from './index.module.scss';

const BannersPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<number>(1);

  useEffect(() => {
    switch (String(currentTab)) {
      case '1':
        dispatch(fetchAdvertisement());
        break;
      case '2':
        dispatch(fetchSlides());
        break;
    }

    return () => {
      dispatch(clearBanners());
    };
  }, [currentTab]);

  return (
    <>
      <div className={styles.bannersHeader}>
        <h1 className={styles.bannersHeader__title}>Баннеры</h1>
        <Button
          className={styles.bannersHeader__createBannerButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_UPDATE_BANNERS)}
        >
          Обновить контент
        </Button>
      </div>
      <BannersLayout setCurrentTab={setCurrentTab} />
    </>
  );
};

BannersPage.PageLayout = AdminLayout;

export default BannersPage;
