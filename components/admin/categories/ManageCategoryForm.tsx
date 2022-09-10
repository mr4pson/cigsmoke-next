import { Button, Form, Input, List, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearImageList,
  setDefaultImageList,
} from 'redux/slicers/imagesSlicer';
import { Page } from 'routes/constants';
import { Category, Parameter } from 'swagger/services';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import styles from './categories.module.scss';
import {
  handleAddParameter,
  handleChangeParent,
  handleFormSubmit,
  handleParameterChange,
  handleRemoveParameter,
} from './helpers';
import { ManageCategoryFields } from './ManageCategoryFields.enum';
import { handleFalsyValuesCheck } from '../../../common/helpers/handleFalsyValuesCheck.helper';

const { Option } = Select;

type Props = {
  categories: Category[];
  category?: Category;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageCategoryForm = ({
  title,
  categories,
  category,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [hasParent, setHasParent] = useState<boolean>(false);
  const imageList = useAppSelector((state) => state.images.imageList);
  const initialValues = {
    name: category?.name,
    url: category?.url,
    image: category?.image,
    parent: category?.parent?.id?.toString(),
  };

  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (category) {
      setName(category?.name);
      setUrl(category?.url);
    }
  }, [category]);

  useEffect(() => {
    dispatch(clearImageList());
  }, []);

  useEffect(() => {
    if (category?.image) {
      dispatch(
        setDefaultImageList({
          name: category.image,
          url: `/api/images/${category?.image}`,
        }),
      );
    }
    setHasParent(!!category?.parent);
    setParameters(category?.parameters! ? [...category?.parameters!] : []);
  }, [category]);

  // const isDisabled: boolean = handleFalsyValuesCheck(name, url, imageList)

  return (
    <>
      <div className={styles.createCategoryHeader}>
        <h1 className={styles.createCategoryHeader__title}>{title}</h1>
      </div>
      {(isLoading || !category) && editMode ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmit(router, dispatch, imageList, parameters)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createCategoryForm}
        >
          <FormItem
            option={ManageCategoryFields.Name}
            children={
              <Input
                required={true}
                placeholder="Введите имя категории"
                onChange={(e) => setName(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageCategoryFields.Url}
            children={
              <Input
                required={true}
                placeholder="Введите URL категории"
                onChange={(e) => setUrl(e.target.value)}
              />
            }
          />
          <FormItem
            option={ManageCategoryFields.Image}
            children={<ImageUpload fileList={imageList} />}
          />
          <Form.Item
            name={ManageCategoryFields.Parent}
            label="Выберите родительскую категорию"
          >
            <Select
              onChange={handleChangeParent(setHasParent)}
              defaultValue="Не выбрано"
            >
              <Option value="">Не выбрано</Option>
              {categories?.map((category) => (
                <Option
                  key={`category-form-${category.id}`}
                  value={category.id?.toString()}
                >
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {hasParent && (
            <>
              <h2 style={{ marginBottom: '10px' }}>Список характеристик</h2>
              <List
                footer={
                  <Button onClick={handleAddParameter(setParameters)}>
                    Добавить
                  </Button>
                }
                bordered={true}
                itemLayout="horizontal"
                dataSource={parameters}
                style={{ marginBottom: '20px' }}
                renderItem={(parameter, index) => (
                  <List.Item
                    actions={[
                      <a
                        key={`remove-btn`}
                        onClick={handleRemoveParameter(index, setParameters)}
                      >
                        удалить
                      </a>,
                    ]}
                  >
                    <Input
                      value={parameter.name}
                      placeholder={'Ввдедите название характеристики'}
                      onChange={handleParameterChange(index, setParameters)}
                    />
                  </List.Item>
                )}
              />
            </>
          )}

          <Form.Item className={styles.createCategoryForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createCategoryForm__buttonsStack__submitButton}
              loading={isSaveLoading}
              // disabled={isDisabled}
            >
              {category ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_CATEGORIES)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageCategoryForm;
