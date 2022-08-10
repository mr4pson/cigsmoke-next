import {
  deleteProduct,
  fetchProducts,
  createProduct,
  editProduct,
} from 'redux/slicers/productsSlicer';
import { AppDispatch } from 'redux/store';
import { navigateTo } from '../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import { TableProps } from 'antd';
import { DataType } from 'common/interfaces/data-type.interface';
import { Category, Image, ParameterProduct, Product } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';

const handleDeleteProduct =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) => async () => {
    const isSaved: any = await dispatch(deleteProduct(id));
    if (!isSaved.error) {
      dispatch(fetchProducts({
        offset: String(offset),
        limit: '20'
      }));
      setVisible((prev) => !prev);
    }
  };

const handleDataConvertation = (
  form,
  images,
  parameterProducts: ParameterProduct[],
) => {
  const newForm = { ...form };
  newForm.price = Number.parseInt(newForm.price, 10);
  newForm.available && (newForm.available = JSON.parse(newForm.available));
  newForm.parameterProducts = parameterProducts.map((parameterProduct) => ({
    parameterId: parameterProduct.parameter?.id,
    value: parameterProduct.value,
  }));

  if (images.length) {
    const imageNameArray = images.map((image) => {
      return image.url.split('/api/images/')[1];
    });

    newForm.images = imageNameArray.join(', ');
  } else {
    newForm.images = null;
  }

  return newForm;
};

const handleFormSubmitProduct =
  (
    router: NextRouter,
    dispatch: AppDispatch,
    images: Image[],
    parameterProducts: ParameterProduct[],
  ) =>
  async (form) => {
    const convertedForm = handleDataConvertation(
      form,
      images,
      parameterProducts,
    );

    if (router.query.id) {
      const isSaved: any = await dispatch(
        editProduct({
          ...convertedForm,
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_PRODUCTS)();
      }

      return;
    }

    const isSaved: any = await dispatch(createProduct(convertedForm));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_PRODUCTS)();
    }
  };

const handleRedirectProducts = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_PRODUCTS]}/${id}`);
};

const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const multipleItemsConverter = (items) => {
  return items?.map((item) => item.id);
};

const imagesConverter = (images) => {
  const imagesArray = images?.split(',');

  const imagesUrlArray = imagesArray?.map((image, index) => {
    const newImage = {
      name: image.trim(),
      url: `/api/images/${image.trim()}`,
      uid: index,
    };
    return newImage;
  });

  return imagesUrlArray;
};

const initialValuesConverter = (product: Product) => {
  const newProduct: any & Product = { ...product };
  newProduct.available = newProduct.available?.toString();
  newProduct.category = newProduct.category?.id;
  newProduct.brand = newProduct.brand?.id;

  newProduct.colors = multipleItemsConverter(newProduct.colors);
  newProduct.tags = multipleItemsConverter(newProduct.tags);

  newProduct.images = imagesConverter(newProduct.images);

  return newProduct;
};

const handleParameterChange =
  (
    index: number,
    setParameterProducts: Dispatch<SetStateAction<ParameterProduct[]>>,
  ) =>
  (e) => {
    setParameterProducts((prev) => {
      const parameterProducts = cloneDeep(prev);

      parameterProducts[index].value = e.target.value;

      return parameterProducts;
    });
  };

const handleCategoryChange =
  (
    categories: Category[],
    setCurCategory: Dispatch<SetStateAction<Category | undefined>>,
    setParameterProducts: Dispatch<SetStateAction<ParameterProduct[]>>,
  ) =>
  (id: string) => {
    const category = categories.find((category) => category.id === id)!;
    setCurCategory(category);
    setParameterProducts(
      category?.parameters?.map((parameter) => ({
        parameter: parameter,
        value: '',
      }))!,
    );
  };

export {
  handleDeleteProduct,
  handleFormSubmitProduct,
  handleRedirectProducts,
  handleTableChange,
  initialValuesConverter,
  handleParameterChange,
  handleCategoryChange,
};
