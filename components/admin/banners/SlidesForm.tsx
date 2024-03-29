import { Button, Form, Input, Spin } from 'antd';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import styled from 'styled-components';
import { Image, Slide } from 'swagger/services';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import { handleFormSubmitBanner, handleGetImage } from './helpers';
import styles from './index.module.scss';
import { ManageSlidesFields } from './manageSlidesFields';
import CloseSVG from '../../../assets/close_black.svg';
import { TBannerState } from 'redux/types';
import { addSlide, removeSlide } from 'redux/slicers/bannersSlicer';

interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
}

const SlidesForm = ({ isLoading, isSaveLoading }: Props) => {
  const dispatch = useAppDispatch();
  const [links, setLinks] = useState<any>({});
  const [form] = Form.useForm();
  const router = useRouter();
  const { slides } = useAppSelector<TBannerState>((state) => state.banners);
  const imageList = useAppSelector<Image[]>((state) => state.images.imageList);

  const initialValues = {
    link1: slides[0]?.link,
    link2: slides[1]?.link,
    link3: slides[2]?.link,
    link4: slides[3]?.link,
    link5: slides[4]?.link,
  };

  useEffect(() => {
    const linksMap = slides?.reduce((accum, slide, index) => {
      accum[index] = slide.link;
      return accum;
    }, {});

    setLinks(linksMap);
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

  const handleLinkChange = (index: number) => (e) => {
    setLinks({
      ...links,
      [index]: e.target.value,
    });
  };

  const handleAddSlide = () => {
    dispatch(addSlide({ link: '' }));
  };

  const handleRemove = (index) => () => {
    dispatch(removeSlide(index));
  };

  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
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
            {slides.map((slide, index) => (
              <SlideItem key={`slides-${index + 1}`}>
                {index + 1}
                <FormItem
                  option={`${ManageSlidesFields.Link}${index + 1}`}
                  children={
                    <Input
                      onChange={handleLinkChange(index + 1)}
                      required={true}
                      placeholder="Введите ссылку"
                    />
                  }
                />
                <FormItem
                  option={undefined}
                  children={
                    <ImageUpload
                      fileList={handleGetImage(index + 1, imageList)}
                      isProduct={false}
                      slideNum={index + 1}
                    />
                  }
                />
                <CloseSVG onClick={handleRemove(index)} />
              </SlideItem>
            ))}
            <Button
              onClick={handleAddSlide}
              type="primary"
              disabled={slides.length === 5}
              style={{ marginBottom: '20px' }}
            >
              Добавить слайд
            </Button>
            {/*--------------THE END--------------*/}
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

const SlideItem = styled.div`
  position: relative;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`;

export default SlidesForm;
