import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Category } from 'swagger/services';
import styles from './categories.module.scss';
import { handleFormSubmit } from './helpers';
import { ManageCategoryFields } from './ManageCategoryFields.enum';

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
  const initialValues = {
    name: category?.name,
    url: category?.url,
    parent: category?.parent?.id?.toString(),
  };

  return (
    <>
      <div className={styles.createCategoryHeader}>
        <h1 className={styles.createCategoryHeader__title}>{title}</h1>
      </div>
      {(isLoading || !category) && editMode ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmit(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createCategoryForm}
        >
          <Form.Item
            name={ManageCategoryFields.Name}
            label="Имя"
            required
            tooltip="Введите имя"
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            label="URL"
            name={ManageCategoryFields.Url}
            required
            tooltip={{ title: 'Введите URL', icon: <InfoCircleOutlined /> }}
          >
            <Input placeholder="Введите URL" />
          </Form.Item>
          <Form.Item
            name={ManageCategoryFields.Parent}
            label="Выберите родительскую категорию"
            tooltip={{
              title: 'Выберите родительскую категорию из списка существующих',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Select defaultValue="Не выбрано">
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
          <Form.Item className={styles.createCategoryForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createCategoryForm__buttonsStack__submitButton}
              loading={isSaveLoading}
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
