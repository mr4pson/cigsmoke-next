import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/tags/constants';
import { handleTableChange } from 'components/admin/tags/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';

import { clearTags, fetchTags } from '../../../redux/slicers/tagsSlicer';
import styles from './index.module.scss';

const TagsPage = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);
  const isLoading = useAppSelector((state) => state.tags.loading);
  const router = useRouter();

  const dataSource = tags?.map(({ id, name, url }) => ({
    key: id,
    id,
    name,
    url,
  })) as unknown as DataType[];

  useEffect(() => {
    dispatch(fetchTags());

    return () => {
      dispatch(clearTags());
    };
  }, []);

  return (
    <>
      <div className={styles.tagsHeader}>
        <h1 className={styles.tagsHeader__title}>Теги</h1>
        <Button
          className={styles.tagsHeader__createTagButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_TAG)}
        >
          Создать новый тег
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

TagsPage.PageLayout = AdminLayout;

export default TagsPage;
