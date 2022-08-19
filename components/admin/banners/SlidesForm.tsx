import { Button, Form, Spin } from 'antd';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'redux/hooks';
import { Page } from 'routes/constants';
import { Image } from 'swagger/services';
import FormItem from '../generalComponents/FormItem';
import ImageUpload from '../generalComponents/ImageUpload';
import { handleFormSubmitBanner } from './helpers';
import styles from './index.module.scss';
import { ManageSlidesFields } from './manageSlidesFields';

interface Props {
  isLoading: boolean;
  isSaveLoading: boolean;
  imageList: Image[];
}

const SlidesForm = ({ isLoading, isSaveLoading, imageList }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <div>
          <Form
            layout="vertical"
            form={form}
            requiredMark={true}
            className={styles.updateBannerForm}
            onFinish={handleFormSubmitBanner(
              router,
              dispatch,
              imageList,
              'slide',
            )}
          >
            <FormItem
              option={ManageSlidesFields.Image}
              children={<ImageUpload fileList={imageList} />}
            />
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

export default SlidesForm;
