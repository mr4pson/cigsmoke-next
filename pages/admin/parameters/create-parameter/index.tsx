import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useEffect } from "react";
import { fetchParameters } from "redux/slicers/parametersSlicer";
import ManageParametersForm from "components/admin/parameters/ManageParametersForm";
import AdminLayout from "components/admin/adminLayout/layout";

const CreateParameter = () => {
    const title = 'Создание параметра';
    const parameters = useAppSelector((state) => state.parameters.parameters);
    const isLoading = useAppSelector((state) => state.parameters.loading);
    const isSaveLoading = useAppSelector((state) => state.parameters.saveLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchParameters());
    }, [dispatch]);

    return (
        <ManageParametersForm
            title={title}
            editMode={false}
            parameters={parameters}
            isLoading={isLoading}
            isSaveLoading={isSaveLoading}
        />
    );
}

CreateParameter.PageLayout = AdminLayout;

export default CreateParameter