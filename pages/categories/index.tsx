import { useAppDispatch, useAppSelector } from "redux/hooks";
import { NextPage } from 'next/types';
import { fetchCategories, clearCategories } from '../../redux/slicers/categoriesSlicer'
import { useEffect } from "react"
import CategoriesTable from "../../components/categories/CategoriesTable"
import styles from './index.module.scss';
import { Spin } from 'antd';
import { Button } from "antd";
import { useRouter } from "next/router";
import { useErrorNotidication } from "./useErrorNotification";

const CategoriesPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categoriesList)
  const isLoading = useAppSelector(state => state.categories.loading)

  const history = useRouter()

  const errorEffect = useErrorNotidication()

  errorEffect()

  useEffect(() => {
    if(categories.length !== 0) {
      return
    }
    dispatch(fetchCategories())
  }, [])

  

  const handleCreateCategoryClick = () => {
    history.push(`/categories/create-category/`)
  }

  return (
    <>
    <div className={styles.categoriesHeader}>
      <h1 className={styles.categoriesHeader__title}>Категории</h1>
      <Button 
      className={styles.categoriesHeader__createCategoryButton} 
      type="primary" 
      onClick={handleCreateCategoryClick}
      >Создать новую категорию</Button>
    </div>
      {isLoading ? <Spin className={styles.spinner} size="large" /> : <CategoriesTable categories={categories} />}
    </>
  );
};

export default CategoriesPage;
