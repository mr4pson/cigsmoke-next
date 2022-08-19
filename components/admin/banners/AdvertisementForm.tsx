import { Button, Form, Input, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import { Advertisement, Image } from 'swagger/services';

import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import { handleFormSubmitBanner } from './helpers';
import styles from './index.module.scss';
import { ManageAdvertisementFields } from './manageAdvertisementFields';

interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
}

const AdvertisementForm = ({ isLoading, isSaveLoading }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const advertisement: Advertisement = useAppSelector<Advertisement[]>(
    (state) => state.banners.advertisement,
  )[0];

  const imageList = useAppSelector<Image[]>((state) => state.images.imageList);

  const initialValues: Advertisement = {
    description: advertisement?.description,
    link: advertisement?.link,
  };

  useEffect(() => {
    if (advertisement) {
      dispatch(
        setDefaultImageList({
          name: advertisement?.image,
          url: `/api/images/${advertisement?.image}`,
        }),
      );
    }
    return () => {
      dispatch(clearImageList());
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <div>
          <Form
            layout="vertical"
            form={form}
            initialValues={initialValues}
            requiredMark={true}
            className={styles.updateBannerForm}
            onFinish={handleFormSubmitBanner(
              router,
              dispatch,
              imageList,
              'advertisement',
              Number.parseInt(advertisement?.id!),
            )}
          >
            <FormItem
              option={ManageAdvertisementFields.Description}
              children={
                <TextArea
                  rows={4}
                  required={true}
                  placeholder="Введите описание баннера"
                />
              }
            />
            <FormItem
              option={ManageAdvertisementFields.Link}
              children={<Input required={true} placeholder="Введите ссылку" />}
            />
            <FormItem
              option={ManageAdvertisementFields.Image}
              children={<ImageUpload fileList={imageList} />}
            />
            <Form.Item className={styles.updateBannerForm__buttonsStack}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.updateBannerForm__buttonsStack__submitButton}
                loading={isSaveLoading}
              >
                Сохранить
              </Button>
              <Button
                type="primary"
                onClick={navigateTo(router, Page.ADMIN_BANNERS)}
              >
                Вернуться назад
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AdvertisementForm;
