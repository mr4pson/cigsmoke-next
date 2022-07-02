import { Dispatch } from "@reduxjs/toolkit";
import { TableProps } from "antd";
import { navigateTo } from "common/helpers";
import { DataType } from "common/interfaces/data-type.interface";
import { NextRouter } from "next/router";
import { createCategory, deleteCategory, editCategory, fetchCategories } from "redux/slicers/categoriesSlicer";
import { AppDispatch } from "redux/store";
import { Page, paths } from "routes/constants";

export const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const handleFormSubmit = (router: NextRouter, dispatch: AppDispatch) => async (form) => {
  if (router.query.id) {
    const isSaved: any = await dispatch(
      editCategory({
        ...form,
        id: router.query.id,
      }),
    );

    if (!isSaved.error) {
      navigateTo(router, Page.CATEGORIES)();
    }

    return;
  }

  const isSaved: any = await dispatch(createCategory(form));

  if (!isSaved.error) {
    navigateTo(router, Page.CATEGORIES)();
  }
};

export const handleDeleteClick = (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
  const isSaved: any = await dispatch(deleteCategory(id));
  if (!isSaved.error) {
    dispatch(fetchCategories());
    setVisible(prev => !prev);
  }
};

export const handleRedirectEdit = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.CATEGORIES]}/${id}`);
};
