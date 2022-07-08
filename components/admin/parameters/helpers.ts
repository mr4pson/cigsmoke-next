import { 
    deleteParameter, 
    fetchParameters, 
    createParameter, 
    editParameter 
} from "redux/slicers/parametersSlicer";
import { AppDispatch } from "redux/store";
import { navigateTo } from "../../../common/helpers";
import { NextRouter } from "next/router";
import { Page, paths } from "routes/constants";
import { TableProps } from "antd";
import { DataType } from "common/interfaces/data-type.interface";

export const handleDeleteParameter = (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
  const isSaved: any = await dispatch(deleteParameter(id));
  if (!isSaved.error) {
    dispatch(fetchParameters());
    setVisible(prev => !prev);
  }
};

export const handleFormSubmitParameter = (router: NextRouter, dispatch: AppDispatch, ) => async (form) => {
  if (router.query.id) {
    const isSaved: any = await dispatch(
      editParameter({
        ...form,
        id: router.query.id,
      }),
    );

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_PARAMETERS)();
    }

    return;
  }

  const isSaved: any = await dispatch(createParameter(form));

  if (!isSaved.error) {
    navigateTo(router, Page.ADMIN_PARAMETERS)();
  }
};

export const handleRedirectParameters = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_PARAMETERS]}/${id}`);
};

export const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};