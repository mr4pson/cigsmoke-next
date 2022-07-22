import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/parameters/constants';
import { handleTableChange } from 'components/admin/parameters/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearParameters,
  fetchParameters,
} from 'redux/slicers/parametersSlicer';
import { Page } from 'routes/constants';

import styles from './index.module.scss';

const Parameters = () => {
  const dispatch = useAppDispatch();
  const parameters = useAppSelector((state) => state.parameters.parameters);
  const isLoading = useAppSelector((state) => state.parameters.loading);
  const router = useRouter();

  const dataSource = parameters?.map(({ id, name, ...rest }) => ({
    key: id,
    id,
    name,
  })) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchParameters());

    return () => {
      dispatch(clearParameters());
    };
  }, []);

  return (
    <>
      <div className={styles.parametersHeader}>
        <h1 className={styles.parametersHeader__title}>Параметры</h1>
        <Button
          className={styles.parametersHeader__createParameterButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_PARAMETER)}
        >
          Создать новый параметр
        </Button>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <Table
          columns={
            columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
          }
          dataSource={dataSource}
          onChange={handleTableChange}
        />
      )}
    </>
  );
};

Parameters.PageLayout = AdminLayout;

export default Parameters;
