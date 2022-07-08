import AdminLayout from 'components/admin/adminLayout/layout';
import ManageParametersForm from 'components/admin/parameters/ManageParametersForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearParameters,
  fetchParameters,
  fetchChosenParameter,
  clearChosenParameter,
} from '../../../redux/slicers/parametersSlicer';

const ManageParameter = () => {
  const title = 'Редактирование параметра';
  const router = useRouter();
  const parameters = useAppSelector((state) => state.parameters.parameters);
  const filteredParameters = parameters.filter(
    (parameters) => parameters.id !== Number(router.query.id),
  );
  const parameter = useAppSelector((state) => state.parameters.chosenParameter);
  const isLoading = useAppSelector((state) => state.parameters.loading);
  const isSaveLoading = useAppSelector((state) => state.parameters.saveLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchParameters());

    return () => {
      dispatch(clearParameters());
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchChosenParameter(router.query.id as string));
    }
    
    return () => {
      dispatch(clearChosenParameter())
    }
  }, [dispatch, router.query]);

  return (
    <ManageParametersForm
      title={title}
      editMode={true}
      parameters={filteredParameters}
      parameter={parameter}
      isLoading={isLoading}
      isSaveLoading={isSaveLoading}
    />
  );
};

ManageParameter.PageLayout = AdminLayout;

export default ManageParameter;
