import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { navigateTo } from 'common/helpers/navigateTo.helper';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Color } from 'swagger/services';
import styles from './colors.module.scss';
import { handleFormSubmitColors } from './helpers';
import { ManageColorFields } from './ManageColorFields.enum';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

const { Option } = Select;

type Props = {
  colors: Color[];
  color?: Color;
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageColorForm = ({
  title,
  colors,
  color,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const initialValues = {
    name: color?.name,
    url: color?.url,
    code: color?.code,
  };

  return (
    <>
      <div className={styles.createColorHeader}>
        <h1 className={styles.createColorHeader__title}>{title}</h1>
      </div>
      {(isLoading || !color) && editMode ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Form
          layout="vertical"
          onFinish={handleFormSubmitColors(router, dispatch)}
          form={form}
          initialValues={initialValues}
          requiredMark={true}
          className={styles.createColorForm}
        >
          <Form.Item
            name={ManageColorFields.Name}
            label="Имя"
            required
            tooltip="Введите имя"
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            label="URL"
            name={ManageColorFields.Url}
            required
            tooltip={{ title: 'Введите URL', icon: <InfoCircleOutlined /> }}
          >
            <Input placeholder="Введите URL" />
          </Form.Item>
          <Form.Item
            name={ManageColorFields.Code}
            label="Выберите цвет"
            tooltip={{
              title: 'Выберите цвет',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Colorpicker />
          </Form.Item>
          <Form.Item className={styles.createColorForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createColorForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {colors ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_COLORS)}
            >
              Вернуться назад
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageColorForm;
