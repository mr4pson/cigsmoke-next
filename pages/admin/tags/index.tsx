import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTags, clearTags } from '../../../redux/slicers/tagsSlicer';
import { useEffect } from 'react';
import TagsTable from '../../../components/admin/tags/TagsTable';
import styles from './index.module.scss';
import { Spin } from 'antd';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';

const TagsPage = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);
  const isLoading = useAppSelector((state) => state.tags.loading);
  const router = useRouter();

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
        <TagsTable tags={tags} />
      )}
    </>
  );
};

TagsPage.PageLayout = AdminLayout;

export default TagsPage;
