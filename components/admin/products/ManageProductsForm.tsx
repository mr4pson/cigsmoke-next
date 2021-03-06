import { Button, Form, Input, Select, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import { Brand, Category, Color, Product, Tag } from 'swagger/services';

import ImageUpload from '../generalComponents/ImageUpload';
import FormItem from '../generalComponents/FormItem';
import { handleFormSubmitProduct, initialValuesConverter } from './helpers';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';

const { Option } = Select;

type Props = {
  products: Product[];
  product?: Product;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
  tags: Tag[];
  colors: Color[];
  categories: Category[];
  brands: Brand[];
};

const ManageProductForm = ({
  title,
  products,
  product,
  isLoading,
  isSaveLoading,
  editMode,
  tags,
  colors,
  categories,
  brands,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = initialValuesConverter(product as Product);

  const imageList = useAppSelector((state) => state.images.imageList);

  useEffect(() => {
    if (initialValues.images) {
      // dispatch(clearImageList());
      initialValues.images.forEach((image) => {
        dispatch(setDefaultImageList(image));
      });
    }
    // console.log(imageList);
  }, [product]);

  return (
    <>
      <div className={styles.createProductHeader}>
        <h1 className={styles.createProductHeader__title}>{title}</h1>
      </div>
      {(isLoading || !product) && editMode ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitProduct(router, dispatch, imageList)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createProductForm}
        >
          {/* ----------------------NAME---------------------- */}
          <FormItem
            option={ManageProductFields.Name}
            children={<Input placeholder="?????????????? ?????? ????????????????" />}
          />
          {/* ----------------------PRICE---------------------- */}
          <FormItem
            option={ManageProductFields.Price}
            children={<Input placeholder="?????????????? ?????????????????? ????????????????" />}
          />
          {/* ----------------------ULR---------------------- */}
          <FormItem
            option={ManageProductFields.Url}
            children={<Input placeholder="?????????????? Url ????????????????" />}
          />
          {/* ----------------------DESCRIPTION---------------------- */}
          <FormItem
            option={ManageProductFields.Desc}
            children={
              <TextArea rows={4} placeholder="?????????????? ???????????????? ????????????????" />
            }
          />
          {/* ----------------------AVAILABLE---------------------- */}
          <Form.Item label="??????????????????????" name="available" required>
            <Select style={{ width: '100%' }}>
              <Option value="true">????????????????</Option>
              <Option value="false">???? ????????????????</Option>
            </Select>
          </Form.Item>

          {/* ----------------------COLORS---------------------- */}
          <Form.Item label="??????????" name="colors" required>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder={`????????????????????, ???????????????? ??????????`}
            >
              {colors?.map((item) => (
                <Option
                  key={item.id}
                  value={item.id}
                >{`ID: ${item.id}, ??????: ${item.name}`}</Option>
              ))}
            </Select>
          </Form.Item>

          {/* ----------------------CATEGORIES---------------------- */}
          <Form.Item label="??????????????????" name="category" required>
            <Select style={{ width: '100%' }}>
              {categories?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    ID: {item.id}, ??????: {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* ----------------------BRANDS---------------------- */}
          <Form.Item label="??????????" name="brand" required>
            <Select style={{ width: '100%' }}>
              {brands?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    ID: {item.id}, ??????: {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* ----------------------TAGS---------------------- */}
          <Form.Item label="????????" name="tags" required>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder={`????????????????????, ???????????????? ????????`}
            >
              {tags?.map((item) => (
                <Option
                  key={item.id}
                  value={item.id}
                >{`ID: ${item.id}, ??????: ${item.name}`}</Option>
              ))}
            </Select>
          </Form.Item>
          {/* ----------------------IMAGES LIST---------------------- */}
          <FormItem
            option={ManageProductFields.Images}
            children={<ImageUpload fileList={imageList} isProduct={true} />}
          />
          {/* ----------------------THE END OF INPUTS---------------------- */}
          <Form.Item className={styles.createProductForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createProductForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {products ? '??????????????????' : '??????????????'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_PRODUCTS)}
            >
              ?????????????????? ??????????
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageProductForm;
