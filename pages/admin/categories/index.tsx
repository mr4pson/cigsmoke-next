import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/hooks";
import { categoriesThunks } from "redux/slicers/categoriesPageSlice";
import { RootState } from "redux/store";
import AdminLayout from "../components/layout/layout";
// import styles from './admin.module.scss';

type Props = {
  categories: any[];
  loading: boolean;
}

const CategoriesPage: React.FC<Props> = ({ categories, loading }) => {

  return (
    <AdminLayout>
      Categories page
      {JSON.stringify(categories)}
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx) {
  const dispatch = useAppDispatch();

  dispatch(categoriesThunks.getCategories());

  const { categories, loading } = useSelector((state: RootState) => state.blocksPage);
  // const res = await axios.get('http://localhost:4002/categories');

  return { props: { categories, loading } };
}

export default CategoriesPage;
