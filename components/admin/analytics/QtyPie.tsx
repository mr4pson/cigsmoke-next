import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import styles from './index.module.scss';

interface Props {
  data: {
    type: string | null;
    value: number | null;
  }[];
}

const QtyPie = ({ data = [{ type: null, value: null }] }: Props) => {
  const config = {
    appendPadding: 7,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie className={styles.chart} {...config} />;
};

export default QtyPie;
