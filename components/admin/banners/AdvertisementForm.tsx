import { Button, Form, Input, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { handleFalsyValuesCheck } from '../../../common/helpers/handleFalsyValuesCheck.helper';

interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
}

const AdvertisementForm = ({ isLoading, isSaveLoading }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [desc, setDesc] = useState<string>();
  const [link, setLink] = useState<string>();

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
      setDesc(advertisement?.description);
      setLink(advertisement?.link);
    }
  }, [advertisement]);

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

  const isDisabled: boolean = handleFalsyValuesCheck(desc, link, imageList);

  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
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
              option={ManageAdvertisementFields.Desc}
              children={
                <TextArea
                  rows={4}
                  required={true}
                  placeholder="Введите описание баннера"
                  onChange={(e) => setDesc(e.target.value)}
                />
              }
            />
            <FormItem
              option={ManageAdvertisementFields.Link}
              children={
                <Input
                  required={true}
                  placeholder="Введите ссылку"
                  onChange={(e) => setLink(e.target.value)}
                />
              }
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
                disabled={isDisabled}
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
