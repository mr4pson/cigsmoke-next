import { InfoCircleOutlined, BgColorsOutlined } from '@ant-design/icons';
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
import { useEffect, useState } from 'react';
import FormItem from '../generalComponents/FormItem';

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

  const [openCP, setOpenCP] = useState(false);
  const [currColor, setCurrColor] = useState<string>();

  useEffect(() => {
    setCurrColor(initialValues.code);
  }, [color]);

  const handleOpenCP = () => {
    setOpenCP(!openCP);
  };

  const handleChangeColor = (e) => {
    setCurrColor(e.hex);
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
          <FormItem
            option={ManageColorFields.Name}
            children={<Input placeholder="?????????????? ?????? ??????????" />}
          />
          <FormItem
            option={ManageColorFields.Url}
            children={<Input placeholder="?????????????? URL ??????????" />}
          />
          <Button
            type="default"
            icon={
              <BgColorsOutlined
                style={{
                  color: currColor,
                }}
              />
            }
            className={styles.createColorForm__openColorButton}
            onClick={handleOpenCP}
          >
            {currColor || '?????????????? ????????'}
          </Button>
          <Form.Item name={ManageColorFields.Code}>
            {openCP && <Colorpicker onChange={handleChangeColor} />}
          </Form.Item>
          <Form.Item className={styles.createColorForm__buttonsStack}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createColorForm__buttonsStack__submitButton}
              loading={isSaveLoading}
            >
              {colors ? '??????????????????' : '??????????????'}
            </Button>
            <Button
              type="primary"
              onClick={navigateTo(router, Page.ADMIN_COLORS)}
            >
              ?????????????????? ??????????
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ManageColorForm;
