import { Dispatch, SetStateAction } from 'react';
import { fetchBrands } from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';
import { CategoryInTree } from 'swagger/services';
import { PopupDisplay } from '../HeaderCart/constants';

const handleCatalogBtnClick =
  (
    setIsOpened: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  (e) => {
    e.stopPropagation();
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev == PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    }, 150);
  };

const handleCategoryHover =
  (
    category: CategoryInTree,
    setCurCategory: Dispatch<SetStateAction<CategoryInTree | undefined>>,
  ) =>
  () => {
    setCurCategory(category!);
  };

const handleSubCategoryHover =
  (
    subCategory: CategoryInTree,
    dispatch: AppDispatch,
    setCurSubCategory: Dispatch<SetStateAction<CategoryInTree | undefined>>,
  ) =>
  () => {
    dispatch(fetchBrands({ category: subCategory?.url }));
    setCurSubCategory(subCategory);
  };

const handleBrandClick =
  (
    setIsOpened: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  () => {
    setIsOpened(false);
    setTimeout(() => setDisplay(PopupDisplay.None), 150);
  };

export {
  handleCatalogBtnClick,
  handleCategoryHover,
  handleSubCategoryHover,
  handleBrandClick,
};
