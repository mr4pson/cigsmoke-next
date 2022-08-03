import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Tag } from 'swagger/services';
import styles from './tags.module.scss';
import { handleFormSubmit } from './helpers';
import { ManageTagFields } from './ManageTagFields.enum';
import FormItem from '../generalComponents/FormItem';

const { Option } = Select;

type Props = {
  tags: Tag[];
  tag?: Tag;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageTagForm = ({
  title,
  tags,
  tag,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    name: tag?.name,
    url: tag?.url,
  };

  return (
    <>
      <div className={styles.createTagHeader}>
        <h1 className={styles.createTagHeader__title}>{title}</h1>
      </div>
      {(isLoading || !tag) && editMode ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmit(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createTagForm}
        >
          <FormItem
            option={ManageTagFields.Name}
            children={<Input required={true} placeholder="Введите имя тега" />}
          />
          <FormItem
            option={ManageTagFields.Url}
            children={
              <Input required={true} placeholder="Введите URL бренда" />
            }
          />
          <Form.Item className={styles.createTagForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createTagForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {tag ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_TAGS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageTagForm;
