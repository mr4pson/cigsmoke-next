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
    width: '15%',
  },
  {
    title: 'Верификация',
    dataIndex: 'isVerified',
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
