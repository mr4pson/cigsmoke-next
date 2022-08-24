import { DataType } from '@antv/l7-core';
import { Spin, Table } from 'antd';
import { AppContext } from 'common/context/AppContext';
import { handleDateFormatter } from 'common/helpers/handleDateFormatter';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearAnalytics,
  fetchAnalyticsUsers,
} from 'redux/slicers/analyticsSlicer';
import { User } from 'swagger/services';

import { columns } from './constants';
import styles from './index.module.scss';

interface Props {
  dateTo;
  dateFrom;
  currentPage;
  setCurrentPage;
}

const NewUsers = ({ dateTo, dateFrom, currentPage, setCurrentPage }: Props) => {
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();

  const usersData = useAppSelector<User[]>(
    (state) => state.analytics.analyticsData,
  );
  const isLoaded = useAppSelector((state) => state.analytics.loading);

  useEffect(() => {
    return () => {
      setOffset(0);
    };
  }, []);

  const dataSource = usersData?.map(
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
      createdAt: handleDateFormatter(createdAt!),
      updatedAt: handleDateFormatter(updatedAt!),
    }),
  ) as unknown as object[];

  return (
    <>
      {isLoaded ? (
        <Spin className={styles.dynamicChartContainer__spinner} size="large" />
      ) : (
        <>
          <div>
            <Table
              columns={columns}
              dataSource={dataSource as User[]}
              pagination={{
                pageSize: 20,
                current: currentPage,
              }}
              scroll={{
                x: 1366,
                y: 768,
              }}
              onChange={(event) => {
                const newOffset = ((event.current as number) - 1) * 20;
                setOffset(newOffset);
                dispatch(
                  fetchAnalyticsUsers({
                    createdFrom: dateFrom,
                    createdTo: dateTo,
                    offset: String(newOffset),
                    limit: '20',
                  }),
                );
                setCurrentPage(event.current as number);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NewUsers;
