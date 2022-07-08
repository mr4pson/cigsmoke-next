import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Parameter } from 'swagger/services';
import styles from './parameters.module.scss';
import { handleFormSubmitParameter } from './helpers';
import { ManageParameterFields } from './ManageParametersFields.enum';

const { Option } = Select;

type Props = {
  parameters: Parameter[];
  parameter?: Parameter;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageParameterForm = ({
  title,
  parameters,
  parameter,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    name: parameter?.name,
  };

  return (
    <>
      <div className={styles.createParameterHeader}>
        <h1 className={styles.createParameterHeader__title}>{title}</h1>
      </div>
      {(isLoading || !parameter) && editMode ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitParameter(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createParameterForm}
      
        >
          <Form.Item
            name={ManageParameterFields.Name}
            label="Имя"
            required
            tooltip="Введите имя"
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item className={styles.createParameterForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createParameterForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {parameters ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.PARAMETERS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageParameterForm;
