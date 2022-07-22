import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/colors/constants';
import { handleTableChange } from 'components/admin/colors/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearColors, fetchColors } from 'redux/slicers/colorsSlicer';
import { Page } from 'routes/constants';

import styles from './index.module.scss';

const Colors = () => {
  const dispatch = useAppDispatch();
  const colors = useAppSelector((state) => state.colors.colors);
  const isLoading = useAppSelector((state) => state.colors.loading);
  const router = useRouter();

  const dataSource = colors?.map(({ id, name, url, code, ...rest }) => ({
    key: id,
    id,
    name,
    url,
    code,
  })) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchColors());

    return () => {
      dispatch(clearColors());
    };
  }, []);

  return (
    <>
      <div className={styles.colorsHeader}>
        <h1 className={styles.colorsHeader__title}>Цвета</h1>
        <Button
          className={styles.colorsHeader__createColorButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_COLORS)}
        >
          Создать новый цвет
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

Colors.PageLayout = AdminLayout;

export default Colors;
