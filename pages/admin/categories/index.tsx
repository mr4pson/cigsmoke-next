import { useAppDispatch, useAppSelector } from "redux/hooks";
//import { categoriesThunks } from "redux/slicers/categoriesPageSlice";
//import { RootState } from "redux/store";
import AdminLayout from "../../../components/admin-layout/layout";
import { NextPage } from 'next/types';
import { fetchCategories } from '../../../redux/slicers/categoriesSlicer'
import { wrapper } from "../../../redux/store"

// import styles from './admin.module.scss';

type Props = {
  categories: any[];
  loading: boolean;
}

const CategoriesPage: NextPage = () => {

  const data = useAppSelector(state => state.categories.categotiesList)

  return (
    <AdminLayout>
      Categories page
      {JSON.stringify(data)}
    </AdminLayout>
  );
};

CategoriesPage.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) => 
    async() => {
      await dispatch(fetchCategories())
    }
)

/*export async function getServerSideProps(ctx) {
  const dispatch = useAppDispatch();

  dispatch(categoriesThunks.getCategories());

  const { categories, loading } = useAppSelector((state: RootState) => state.blocksPage);
  // const res = await axios.get('http://localhost:4002/categories');

  return { props: { categories, loading } };
}*/

export default CategoriesPage;
