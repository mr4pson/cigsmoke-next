import { Col, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import AdvertisementDescList from './AdvertisementDescList';

import AdvertisementImage from './AdvertisementImage';
import styles from './index.module.scss';

interface Props {
  isLoading: boolean;
}

const AdvertisementTab = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Row
          gutter={[
            {
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
              xl: 40,
              xxl: 48,
            },
            {
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
              xl: 40,
              xxl: 48,
            },
          ]}
          className={styles.bannersTab}
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 10 }}
            xl={{ span: 10 }}
            xxl={{ span: 12 }}
            className={styles.bannersTab__advertisementImageContainer}
          >
            <AdvertisementImage />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 14 }}
            xl={{ span: 14 }}
            xxl={{ span: 12 }}
            className={styles.bannersTab__descriptionListContainer}
          >
            <AdvertisementDescList />
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdvertisementTab;
