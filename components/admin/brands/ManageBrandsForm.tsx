import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Brand } from 'swagger/services';
import styles from './brands.module.scss';
import { handleFormSubmitBrands } from './helpers';
import ImageUpload from './ImageUpload';
import { ManageBrandFields } from './ManageBrandsFields.enum';

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
    image: brand?.image,
  };

  return (
    <>
      <div className={styles.createBrandHeader}>
        <h1 className={styles.createBrandHeader__title}>{title}</h1>
      </div>
      {(isLoading || !brand) && editMode ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitBrands(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createBrandForm}
        >
          <Form.Item
            name={ManageBrandFields.Name}
            label="Имя"
            required
            tooltip="Введите имя"
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            label="Изображение"
            name={ManageBrandFields.Image}
            required
            tooltip={{
              title: 'Выберите изображение из локального хранилища',
              icon: <InfoCircleOutlined />,
            }}
          >
            <ImageUpload />
          </Form.Item>
          <Form.Item className={styles.createBrandForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createBrandForm__buttonsStack__submitButton}
              loading={isSaveLoading}
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
