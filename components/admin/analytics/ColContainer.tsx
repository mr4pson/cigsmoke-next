import { Col } from 'antd';
import React from 'react';
import styles from './index.module.scss';

const ColContainer = ({ children }) => {
  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 24 }}
      lg={{ span: 24 }}
      xl={{ span: 12 }}
      xxl={{ span: 12 }}
    >
      {children}
    </Col>
  );
};

export default ColContainer;
