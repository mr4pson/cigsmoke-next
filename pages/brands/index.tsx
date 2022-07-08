import { Button, Spin } from "antd";
import { navigateTo } from "common/helpers";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { 
  useAppDispatch, 
  useAppSelector 
} from "redux/hooks";
import { 
  clearBrands, 
  fetchBrands 
} from "redux/slicers/brandsSlicer";
import { Page } from "routes/constants";
import styles from './index.module.scss';
import { idText } from "typescript";
import { DataType } from "common/interfaces/data-type.interface";
import BrandsTable from "components/brands/BrandsTable";

const Brands: NextPage = () => {
    const dispatch = useAppDispatch();
    const brands = useAppSelector(state => state.brands.brands);
    const isLoading = useAppSelector(state => state.brands.loading);
    const router = useRouter();

    const dataSource = brands?.map(
        ({id, name, image, ...rest}) => ({
        key: idText,
        id,
        name,
        image
    })) as unknown as DataType[];


    useEffect(() => {
        dispatch(fetchBrands());

        return () => {
            dispatch(clearBrands())
        }
    }, [])

    return (<>
        <div className={styles.brandsHeader}>
        <h1 className={styles.brandsHeader__title}>Бренды</h1>
        <Button
          className={styles.brandsHeader__createBrandButton}
          type="primary"
          onClick={navigateTo(router, Page.CREATE_BRAND)}
        >
          Создать новый бренд
        </Button>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <BrandsTable brands={brands} />
      )}
    </>)
}

export default Brands