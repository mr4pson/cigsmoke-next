import { useAppDispatch, useAppSelector } from "redux/hooks";
//import { categoriesThunks } from "redux/slicers/categoriesPageSlice";
//import { RootState } from "redux/store";
import AdminLayout from "../../../components/admin-layout/layout";
import { NextPage } from 'next/types';
import { fetchCategories, clearCategories } from '../../../redux/slicers/categoriesSlicer'
import { wrapper } from "../../../redux/store"
import { useEffect } from "react"
import { PageHeader } from 'antd';
import CategoriesTable from "../../../admin/components/categories/CategoriesTable"
import styles from './index.module.scss';


type Props = {
  categories: any[];
  loading: boolean;
}

const CategoriesPage: NextPage = () => {

  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categoriesList)

  const isLoading = useAppSelector(state => state.categories.loading)

  useEffect(() => {
    dispatch(fetchCategories())

    return () => {
      dispatch(clearCategories())
    }
  }, [])

  const loader = <h1>Loading...</h1>

  return (
    <AdminLayout>
      <h1 className={styles.h1}>Категории</h1>
      <CategoriesTable categories={categories} />
      {/*isLoading ? loader : <ul>
        {categories.map(category => <li key={category.id}>{category.name}</li>)}
  </ul>*/}
    </AdminLayout>
  );
};

/*CategoriesPage.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) => 
    async() => {
      await dispatch(fetchCategories())
    }
)*/

/*export async function getServerSideProps(ctx) {
  const dispatch = useAppDispatch();

  dispatch(categoriesThunks.getCategories());

  const { categories, loading } = useAppSelector((state: RootState) => state.blocksPage);
  // const res = await axios.get('http://localhost:4002/categories');

  return { props: { categories, loading } };
}*/

export default CategoriesPage;
