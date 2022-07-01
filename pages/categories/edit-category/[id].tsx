import { Category } from 'common/interfaces/types';
import ManageCategoriesLayouts from 'components/categories/ManageCategoriesLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearState, setState } from 'redux/slicers/chosenCategoryToEdit';
import { handleConfirmEditCategory } from '../../../common/helpers';
import { fetchCategories } from '../../../redux/slicers/categoriesSlicer';

const ManageCategory = () => {
    const title = "Редактирование категории"
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.categories.categoriesList)

    const router = useRouter()

    const categoryToEdit: Category = categories?.find(category => category.id.toString() === router.query.id)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(setState(categoryToEdit))

        return () => {
            dispatch(clearState())
        }
    }, [])

    return <ManageCategoriesLayouts 
        title={title}  
        handleConfirm={handleConfirmEditCategory}
    />
}

export default ManageCategory