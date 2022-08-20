import { ColumnsType } from 'antd/lib/table/interface';
import React from 'react';
import { User } from 'swagger/services';

interface DataType extends User {
  key: React.Key;
}

export const columns: ColumnsType<User> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: 'Имя и фамилия',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '15%',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    filters: [
      {
        text: 'Администратор',
        value: 'Администратор',
      },
      {
        text: 'Пользователь',
        value: 'Пользователь',
      },
    ],
    filterMode: 'tree',
    onFilter: (value: string | number | boolean, record) =>
      (record?.role as string).startsWith(value.toString()),
    filterSearch: true,
    width: '15%',
  },
  {
    title: 'Верификация',
    dataIndex: 'isVerified',
    filters: [
      {
        text: 'Верифицирован',
        value: 'Верифицирован',
      },
      {
        text: 'Не верифицирован',
        value: 'Не верифицирован',
      },
    ],
    onFilter: (value: string | number | boolean, record) =>
      new String(record?.isVerified!).startsWith(value.toString()),
    filterSearch: true,
    width: '15%',
  },
  {
    title: 'Создан',
    dataIndex: 'createdAt',
    width: '15%',
  },
  {
    title: 'Последнее обновление',
    dataIndex: 'updatedAt',
    width: '15%',
  },
];
