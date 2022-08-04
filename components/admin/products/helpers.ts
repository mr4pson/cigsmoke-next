import { 
    deleteProduct, 
    fetchProducts, 
    createProduct, 
    editProduct 
} from "redux/slicers/productsSlicer";
import { AppDispatch } from "redux/store";
import { navigateTo } from "../../../common/helpers";
import { NextRouter } from "next/router";
import { Page, paths } from "routes/constants";
import { TableProps } from "antd";
import { DataType } from "common/interfaces/data-type.interface";
import { Image, Product } from "swagger/services";

export const handleDeleteProduct = (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
  const isSaved: any = await dispatch(deleteProduct(id));
  if (!isSaved.error) {
    dispatch(fetchProducts());
    setVisible(prev => !prev);
  }
};

const handleDataConvertation = (form, images) => {
  const newForm = {...form}
  newForm.price = Number.parseInt(newForm.price, 10)
  newForm.available && (newForm.available = JSON.parse(newForm.available))
  
  if(images.length) {
    const imageNameArray = images.map(image => {
    return image.url.split("/api/images/")[1]
    })

  newForm.images = imageNameArray.join(', ')
  } else {
    newForm.images = null
  }
  
  
  return newForm
}

export const handleFormSubmitProduct = (router: NextRouter, dispatch: AppDispatch, images: Image[]) => async (form) => {
  const convertedForm = handleDataConvertation(form, images)
  console.log(convertedForm)
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

export const handleRedirectProducts = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_PRODUCTS]}/${id}`);
};

export const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const multipleItemsConverter = (items) => {
  return items?.map(item => item.id)
}

const imagesConverter = (images) => {
  const imagesArray = images?.split(',')

  const imagesUrlArray = imagesArray?.map((image, index) => {
    const newImage = {
      name: image.trim(),
      url: `/api/images/${image.trim()}`,
      uid: index
    }
    return newImage
  })

  return imagesUrlArray
}

export const initialValuesConverter = (product: Product) => {
  const newProduct: any & Product = {...product}
  newProduct.available = newProduct.available?.toString()
  newProduct.category = newProduct.category?.id
  newProduct.brand = newProduct.brand?.id

  newProduct.colors = multipleItemsConverter(newProduct.colors)
  newProduct.tags = multipleItemsConverter(newProduct.tags)

  newProduct.images = imagesConverter(newProduct.images)

  return newProduct
}