import {
  changeSearchQuery,
  clearSearchProducts,
  clearSearchQuery,
  searchProducts,
} from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';
import { Category } from 'swagger/services';

const handleSearchItemClick = (dispatch: AppDispatch) => () => {
  dispatch(clearSearchProducts());
  dispatch(clearSearchQuery());
};

const handleSearchQueryChange =
  (selected: Category | undefined, dispatch: AppDispatch) => (e: any) => {
    const searchQuery = e.target.value;

    dispatch(changeSearchQuery(searchQuery));

    if (!searchQuery) {
      dispatch(clearSearchProducts());

      return;
    }

    const payload = {
      name: searchQuery,
      categories: selected ? [selected?.url!] : [],
    };

    dispatch(searchProducts(payload));
  };

export { handleSearchItemClick, handleSearchQueryChange };
