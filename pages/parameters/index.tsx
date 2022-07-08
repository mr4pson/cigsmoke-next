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
  clearParameters, 
  fetchParameters 
} from "redux/slicers/parametersSlicer";
import { Page } from "routes/constants";
import styles from './index.module.scss';
import { idText } from "typescript";
import { DataType } from "common/interfaces/data-type.interface";
import ParametersTable from "components/parameters/ParametersTable";

const Parameters: NextPage = () => {
    const dispatch = useAppDispatch();
    const parameters = useAppSelector(state => state.parameters.parameters);
    const isLoading = useAppSelector(state => state.parameters.loading);
    const router = useRouter();

    const dataSource = parameters?.map(
        ({id, name, ...rest}) => ({
        key: idText,
        id,
        name,
    })) as unknown as DataType[];


    useEffect(() => {
        dispatch(fetchParameters());

        return () => {
            dispatch(clearParameters())
        }
    }, [])

    return (<>
        <div className={styles.parametersHeader}>
        <h1 className={styles.parametersHeader__title}>Параметры</h1>
        <Button
          className={styles.parametersHeader__createParameterButton}
          type="primary"
          onClick={navigateTo(router, Page.CREATE_PARAMETER)}
        >
          Создать новый параметр
        </Button>
      </div>
      {isLoading ? (
        <Spin className="spinner" size="large" />
      ) : (
        <ParametersTable parameters={parameters} />
      )}
    </>)
}

export default Parameters