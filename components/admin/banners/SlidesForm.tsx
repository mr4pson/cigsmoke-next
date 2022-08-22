import { Button, Form, Spin, Input } from 'antd';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import { Category, Image, Slide } from 'swagger/services';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import {
  handleCheckFalsyValues,
  handleFormSubmitBanner,
  handleGetImage,
} from './helpers';
import styles from './index.module.scss';
import { ManageSlidesFields } from './manageSlidesFields';

interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
}

const SlidesForm = ({ isLoading, isSaveLoading }: Props) => {
  const [link1, setLink1] = useState<string>();
  const [link2, setLink2] = useState<string>();
  const [link3, setLink3] = useState<string>();
  const [link4, setLink4] = useState<string>();
  const [link5, setLink5] = useState<string>();

  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const slides = useAppSelector<Slide[]>((state) => state.banners.slides);

  const imageList = useAppSelector<Image[]>((state) => state.images.imageList);

  const isDisabled = handleCheckFalsyValues(
    imageList,
    link1,
    link2,
    link3,
    link4,
    link5,
  );

  const initialValues = {
    link1: slides[0]?.link,
    link2: slides[1]?.link,
    link3: slides[2]?.link,
    link4: slides[3]?.link,
    link5: slides[4]?.link,
  };

  useEffect(() => {
    setLink1(slides[0]?.link);
    setLink2(slides[1]?.link);
    setLink3(slides[2]?.link);
    setLink4(slides[3]?.link);
    setLink5(slides[4]?.link);
  }, [slides]);

  useEffect(() => {
    if (slides) {
      slides.forEach((slide, i) => {
        dispatch(
          setDefaultImageList({
            uid: i + 1,
            name: slide?.image,
            url: `/api/images/${slide?.image}`,
          }),
        );
      });
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
            requiredMark={true}
            className={styles.updateBannerForm}
            initialValues={initialValues}
            onFinish={handleFormSubmitBanner(
              router,
              dispatch,
              imageList,
              'slide',
            )}
          >
            {/*----------------1----------------*/}
            <FormItem
              option={ManageSlidesFields.Link0}
              children={
                <Input
                  onChange={(e) => setLink1(e.target.value)}
                  required={true}
                  placeholder="Введите ссылку"
                />
              }
            />
            <FormItem
              option={undefined}
              children={
                <ImageUpload
                  fileList={handleGetImage(1, imageList)}
                  isProduct={false}
                  slideNum={1}
                />
              }
            />
            {/*----------------2----------------*/}
            <FormItem
              option={ManageSlidesFields.Link1}
              children={
                <Input
                  onChange={(e) => setLink2(e.target.value)}
                  required={true}
                  placeholder="Введите ссылку"
                />
              }
            />
            <FormItem
              option={undefined}
              children={
                <ImageUpload
                  fileList={handleGetImage(2, imageList)}
                  isProduct={false}
                  slideNum={2}
                />
              }
            />
            {/*----------------3----------------*/}
            <FormItem
              option={ManageSlidesFields.Link2}
              children={
                <Input
                  onChange={(e) => setLink3(e.target.value)}
                  required={true}
                  placeholder="Введите ссылку"
                />
              }
            />
            <FormItem
              option={undefined}
              children={
                <ImageUpload
                  fileList={handleGetImage(3, imageList)}
                  isProduct={false}
                  slideNum={3}
                />
              }
            />
            {/*----------------4----------------*/}
            <FormItem
              option={ManageSlidesFields.Link3}
              children={
                <Input
                  onChange={(e) => setLink4(e.target.value)}
                  required={true}
                  placeholder="Введите ссылку"
                />
              }
            />
            <FormItem
              option={undefined}
              children={
                <ImageUpload
                  fileList={handleGetImage(4, imageList)}
                  isProduct={false}
                  slideNum={4}
                />
              }
            />
            {/*----------------5----------------*/}
            <FormItem
              option={ManageSlidesFields.Link4}
              children={
                <Input
                  onChange={(e) => setLink5(e.target.value)}
                  required={true}
                  placeholder="Введите ссылку"
                />
              }
            />
            <FormItem
              option={undefined}
              children={
                <ImageUpload
                  fileList={handleGetImage(5, imageList)}
                  isProduct={false}
                  slideNum={5}
                />
              }
            />
            {/*--------------THE END--------------*/}
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

export default SlidesForm;
