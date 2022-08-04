import { Col } from 'antd';
import React from 'react';
import styles from './index.module.scss';

const ColContainer = ({ children }) => {
  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 20 }}
      md={{ span: 12 }}
      lg={{ span: 12 }}
      xl={{ span: 8 }}
      xxl={{ span: 8 }}
    >
      {children}
    </Col>
  );
};

export default ColContainer;
