import ManageCategoriesLayouts from 'components/categories/ManageCategoriesLayout';
import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { clearState } from 'redux/slicers/chosenCategoryToEdit';
import { handleConfirmCreateCategory } from '../../../common/helpers';
import { fetchCategories } from '../../../redux/slicers/categoriesSlicer';

const ManageCategory = () => {
  const title = "Создание категории"

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCategories())

    return () => {
      dispatch(clearState())
    }
  }, [dispatch])

  return <ManageCategoriesLayouts 
  title={title}  
  handleConfirm={handleConfirmCreateCategory}
  />
}

export default ManageCategory