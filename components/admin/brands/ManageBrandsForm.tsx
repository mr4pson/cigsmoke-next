import { Button, Form, Input, Select, Spin, Switch } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import { Brand } from 'swagger/services';

import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import styles from './brands.module.scss';
import { handleFormSubmitBrands } from './helpers';
import { ManageBrandFields } from './ManageBrandsFields.enum';
import {handleFalsyValuesCheck} from "../../../common/helpers/handleFalsyValuesCheck.helper";

const { Option } = Select;

type Props = {
  brands: Brand[];
  brand?: Brand;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageBrandForm = ({
  title,
  brands,
  brand,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    name: brand?.name,
    url: brand?.url,
    image: brand?.image,
    showOnMain: brand?.showOnMain,
  };

  const [name, setName] = useState<string>()
  const [url, setUrl] = useState<string>()

  const imageList = useAppSelector((state) => state.images.imageList);

  useEffect(() => {
    if(brand) {
      setName(brand?.name)
      setUrl(brand?.url)
    }

    if (brand?.image) {
      dispatch(
        setDefaultImageList({
          name: brand.image,
          url: `/api/images/${brand?.image}`,
        }),
      );
    }
  }, [brand]);

  useEffect(() => {
    dispatch(clearImageList());
  }, []);

  const isDisabled: boolean = handleFalsyValuesCheck(name, url, imageList)

  return (
    <>
      <div className={styles.createBrandHeader}>
        <h1 className={styles.createBrandHeader__title}>{title}</h1>
      </div>
      {(isLoading || !brand) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitBrands(router, dispatch, imageList)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createBrandForm}
        >
          <FormItem
            option={ManageBrandFields.Name}
            children={
              <Input required={true} placeholder="Введите имя бренда"
                     onChange={e => setName(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageBrandFields.Url}
            children={
              <Input required={true} placeholder="Введите URL бренда"
                     onChange={e => setUrl(e.target.value)}
              />
            }
          />
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Показать на главной странице
          </label>
          <Form.Item
            name={ManageBrandFields.ShowOnMain}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <FormItem
            option={ManageBrandFields.Image}
            children={<ImageUpload fileList={imageList} />}
          />
          <Form.Item className={styles.createBrandForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createBrandForm__buttonsStack__submitButton}
              loading={isSaveLoading}
              disabled={isDisabled}
            >
              {brands ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_BRANDS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageBrandForm;
