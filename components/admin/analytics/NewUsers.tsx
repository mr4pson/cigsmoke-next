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

<<<<<<< HEAD
  useEffect(() => {
    dispatch(
      fetchAnalyticsUsers({
        createdFrom: dateFrom,
        createdTo: dateTo,
        offset: String(offset),
        limit: '20',
      }),
    );
=======
  const handleDateFormatter = (date: string | undefined): string => {
    const dateArr: string[] = date!?.split('T')[0].split('-');
    const newDateArr: string[] = [];
    for (let i = dateArr?.length - 1; i >= 0; i--) {
      newDateArr.push(dateArr[i]);
    }
    const newDate = newDateArr?.join('.') + ' г.';
    return newDate;
  };
>>>>>>> master

    return () => {
      dispatch(clearAnalytics());
      setOffset(0);
    };
  }, []);

  const dataSourse = usersData?.map(
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
              dataSource={dataSourse as User[]}
              pagination={{
                pageSize: 20,
                current: currentPage,
              }}
              scroll={{ y: 500 }}
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
