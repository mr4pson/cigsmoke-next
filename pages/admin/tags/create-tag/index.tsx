import AdminLayout from 'components/admin/adminLayout/layout';
import ManageTagForm from 'components/admin/tags/ManageTagForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTags } from '../../../../redux/slicers/tagsSlicer';

const CreateTag = () => {
  const title = 'Создание тега';
  const tags = useAppSelector((state) => state.tags.tags);
  const isLoading = useAppSelector((state) => state.tags.loading);
  const isSaveLoading = useAppSelector((state) => state.tags.saveLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <ManageTagForm
      title={title}
      editMode={false}
      tags={tags}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

CreateTag.PageLayout = AdminLayout;

export default CreateTag;
