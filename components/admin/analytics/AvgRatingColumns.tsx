import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import styles from './index.module.scss';

interface Props {
  data: {
    type: string | null;
    value: number | null;
  }[];
}

const AvgRatingColumns = ({ data = [{ type: null, value: null }] }: Props) => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Наименование',
      },
      value: {
        alias: 'Средняя оценка пользователей',
      },
    },
  } as any;
  return <Column className={styles.chart} {...config} />;
};

export default AvgRatingColumns;
