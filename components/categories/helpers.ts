import { TableProps } from "antd";
import { DataType } from "common/interfaces/data-type.interface";
import { NextRouter } from "next/router";
import { createNewCategory, deleteCategory, editCategory } from "redux/slicers/categoriesSlicer";
import { AppDispatch } from "redux/store";
import { Page, paths } from "routes/constants";

export const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const handleRedirect = (router, isSaved) => {
  if (!isSaved.error) {
    router.push(paths[Page.CATEGORIES])
  }
}

export const handleFormSubmit = (router: NextRouter, dispatch: AppDispatch) => async (form) => {
  console.log(form);
  if (router.query.id) {
    const isSaved: any = await dispatch(
      editCategory({
        ...form,
        id: router.query.id,
      }),
    );

    handleRedirect(router, isSaved);

    return;
  }

  const isSaved: any = await dispatch(createNewCategory(form));

  handleRedirect(router, isSaved);
};

export const handleDeleteClick = (id: string, dispatch: AppDispatch) => () => {
  dispatch(deleteCategory(id));
};

export const handleRedirectEdit = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.CATEGORIES]}/${id}`);
};
