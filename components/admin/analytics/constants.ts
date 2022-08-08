import { ColumnsType } from "antd/lib/table/interface";
import { DynamicUsersData } from "common/interfaces/data-analytics.interfaces";
import React from "react";
import { User } from "swagger/services";

interface DataType extends User {
  key: React.Key;
}

export const columns: ColumnsType<User> = [
    {
    title: 'Id',
    dataIndex: 'id',
    width: '10%'
  },
  {
    title: 'Имя и фамилия',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.email!.localeCompare(b.email!),
    },
    width: '30%'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: {
      compare: (a, b) => a.email!.localeCompare(b.email!),
    },
    width: '20%'
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
    onFilter: (value: string, record) => (record?.role as string).startsWith(value),
    filterSearch: true,
    width: '10%',
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
    onFilter: (value: string, record) => (record?.isVerified as string).startsWith(value),
    filterSearch: true,
    width: '10%',
  },
    {
    title: 'Создан',
    dataIndex: 'createdAt',
    sorter: {
      compare: (a, b) => a.email!.localeCompare(b.email!),
    },
    width: '10%'
  },
    {
    title: 'Последнее обновление',
    dataIndex: 'updatedAt',
    sorter: {
      compare: (a, b) => a.email!.localeCompare(b.email!),
    },
    width: '10%'
  },
];