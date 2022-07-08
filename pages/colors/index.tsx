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
  clearColors, 
  fetchColors 
} from "redux/slicers/colorsSlicer";
import { Page } from "routes/constants";
import styles from './index.module.scss';
import { idText } from "typescript";
import { DataType } from "common/interfaces/data-type.interface";
import ColorsTable from "components/colors/ColorsTable";

const Colors: NextPage = () => {
    const dispatch = useAppDispatch();
    const colors = useAppSelector(state => state.colors.colors);
    const isLoading = useAppSelector(state => state.colors.loading);
    const router = useRouter();

    const dataSource = colors?.map(
        ({id, name, url, code, ...rest}) => ({
        key: idText,
        id,
        name,
        url,
        code
    })) as unknown as DataType[];


    useEffect(() => {
        dispatch(fetchColors());

        return () => {
            dispatch(clearColors())
        }
    }, [])

    return (<>
        <div className={styles.colorsHeader}>
        <h1 className={styles.colorsHeader__title}>Цвета</h1>
        <Button
          className={styles.colorsHeader__createColorButton}
          type="primary"
          onClick={navigateTo(router, Page.CREATE_COLORS)}
        >
          Создать новый цвет
        </Button>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <ColorsTable colors={colors} />
      )}
    </>)
}

export default Colors