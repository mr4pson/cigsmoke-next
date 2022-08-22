import { LineConfig } from '@ant-design/charts';
import { Line } from '@ant-design/plots';
import React from 'react';

import styles from './index.module.scss';

const DynamicPlotPoint = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'amount',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  } as unknown as LineConfig;
  return (
    <Line className={styles.dynamicChartContainer__dynamicChart} {...config} />
  );
};

export default DynamicPlotPoint;
