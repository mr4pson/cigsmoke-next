import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import {
  changeSearchQuery,
  clearSearchProducts,
  clearSearchQuery,
  searchProducts,
} from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';
import { Category, CategoryInTree } from 'swagger/services';

const handleSearchItemClick = (dispatch: AppDispatch) => () => {
  dispatch(clearSearchProducts());
  dispatch(clearSearchQuery());
};

const handleSearchQueryChange =
  (
    selected: CategoryInTree | undefined,
    setFocused: Dispatch<SetStateAction<boolean>>,
    dispatch: AppDispatch,
  ) =>
  (e: any) => {
    const searchQuery = e.target.value;

    dispatch(changeSearchQuery(searchQuery));

    if (!searchQuery) {
      dispatch(clearSearchProducts());

      return;
    }

    setFocused(true);

    const payload = {
      name: searchQuery,
      parent: selected?.url,
      limit: 5,
    };

    dispatch(searchProducts(payload));
  };

const handleSearchFormSubmit =
  (
    selectedCategory: CategoryInTree | undefined,
    searchQuery: string,
    router: NextRouter,
    setFocused: Dispatch<SetStateAction<boolean>>,
  ) =>
  (e) => {
    e.preventDefault();
    const query: { name: string; categories?: string } = {
      name: searchQuery,
    };

    if (selectedCategory) {
      query.categories = selectedCategory?.url;
    }

    router.push({
      pathname: '/catalog',
      query,
    });

    setFocused(false);
  };

export {
  handleSearchItemClick,
  handleSearchQueryChange,
  handleSearchFormSubmit,
};
