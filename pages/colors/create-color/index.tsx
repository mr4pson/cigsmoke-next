import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useEffect } from "react";
import { fetchColors } from "redux/slicers/colorsSlicer";
import ManageColorForm from "components/colors/ManageColorForm";

const CreateColor = () => {
    const title = 'Создание цвета';
    const colors = useAppSelector((state) => state.colors.colors);
    const isLoading = useAppSelector((state) => state.colors.loading);
    const isSaveLoading = useAppSelector((state) => state.colors.saveLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchColors());
    }, [dispatch]);

    return (
        <ManageColorForm
            title={title}
            editMode={false}
            colors={colors}
            isLoading={isLoading}
            isSaveLoading={isSaveLoading}
        />
    );
}

export default CreateColor