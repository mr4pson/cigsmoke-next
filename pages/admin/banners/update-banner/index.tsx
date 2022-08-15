import AdminLayout from 'components/admin/adminLayout/layout';
import BannersFormLayout from 'components/admin/banners/BannersFormLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearBanners,
  fetchAdvertisement,
  fetchSlides,
} from 'redux/slicers/bannersSlicer';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Advertisement, Slide } from 'swagger/services';

import styles from '../index.module.scss';

const UpdateBanner = () => {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [initialValues, setInitialValues] = useState<Advertisement | Slide>();

  const data = useAppSelector<Advertisement[]>((state) => state.banners.data);

  const imageList = useAppSelector((state) => state.images.imageList);

  useEffect(() => {
    switch (String(currentTab)) {
      case '1':
        dispatch(fetchAdvertisement());
        setInitialValues({
          image: data[0]?.image,
          description: data[0]?.description,
          link: data[0]?.link,
          id: data[0]?.id,
        });
        if (initialValues?.image) {
          dispatch(
            setDefaultImageList({
              name: initialValues?.image,
              url: `/api/images/${initialValues?.image}`,
            }),
          );
        }
        break;
      case '2':
        dispatch(clearImageList());
        dispatch(fetchSlides());
        break;
    }

    return () => {
      dispatch(clearBanners());
    };
  }, [currentTab]);

  return (
    <>
      <div>
        <h1 className={styles.bannersHeader__title}>Обновление баннеров</h1>
      </div>
      <div>
        <BannersFormLayout
          setCurrentTab={setCurrentTab}
          initialValues={initialValues}
          imageList={imageList}
        />
      </div>
    </>
  );
};

UpdateBanner.PageLayout = AdminLayout;

export default UpdateBanner;
