import { DataType } from '@antv/l7-core';
import { Spin, Table } from 'antd';
import { DynamicUsersData } from 'common/interfaces/data-analytics.interfaces';
import { useAppSelector } from 'redux/hooks';

import { columns } from './constants';
import styles from './index.module.scss';

const NewUsers = () => {
  const usersData = useAppSelector<DynamicUsersData>(
    (state) => state.analytics.usersData,
  );
  const isLoaded = useAppSelector((state) => state.analytics.loading);

  const handleDateFormatter = (date: string | undefined): string => {
    const dateArr: string[] = date!?.split('T')[0].split('-');
    const newDateArr: string[] = [];
    for (let i = dateArr?.length - 1; i >= 0; i--) {
      newDateArr.push(dateArr[i]);
    }
    const newDate = newDateArr?.join('.') + ' г.';
    return newDate;
  };

  const dataSourse = usersData?.data?.map(
    ({
      id,
      isVerified,
      firstName,
      lastName,
      email,
      role,
      createdAt,
      updatedAt,
    }) => ({
      key: id,
      id,
      isVerified: isVerified === true ? 'Верифицирован' : 'Не верифицирован',
      name: `${firstName} ${lastName}`,
      email,
      role: role === 'Admin' ? 'Администратор' : 'Пользователь',
      createdAt: handleDateFormatter(createdAt),
      updatedAt: handleDateFormatter(updatedAt),
    }),
  ) as unknown as readonly object[];

  return (
    <>
      {isLoaded ? (
        <Spin className={styles.dynamicChartContainer__spinner} size="large" />
      ) : (
        <>
          <div>
            <Table
              columns={columns}
              dataSource={dataSourse}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 500 }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NewUsers;
