import { 
    deleteProduct, 
    fetchProducts, 
    createProduct, 
    editProduct 
} from "redux/slicers/productsSlicer";
import { AppDispatch } from "redux/store";
import { navigateTo } from "../../common/helpers";
import { NextRouter } from "next/router";
import { Page, paths } from "routes/constants";
import { TableProps } from "antd";
import { DataType } from "common/interfaces/data-type.interface";

export const handleDeleteProduct = (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
  const isSaved: any = await dispatch(deleteProduct(id));
  if (!isSaved.error) {
    dispatch(fetchProducts());
    setVisible(prev => !prev);
  }
};

export const handleFormSubmitProduct = (router: NextRouter, dispatch: AppDispatch, ) => async (form) => {
  if (router.query.id) {
    const isSaved: any = await dispatch(
      editProduct({
        ...form,
        id: router.query.id,
      }),
    );

    if (!isSaved.error) {
      navigateTo(router, Page.PRODCUCTS)();
    }

    return;
  }

  const isSaved: any = await dispatch(createProduct(form));

  if (!isSaved.error) {
    navigateTo(router, Page.PRODCUCTS)();
  }
};

export const handleRedirectProducts = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.PRODCUCTS]}/${id}`);
};

export const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};