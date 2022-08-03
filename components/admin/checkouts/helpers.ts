import { deleteCheckout, fetchCheckouts } from 'redux/slicers/checkoutsSlicer';
import { AppDispatch } from 'redux/store';

export const handleDeleteCheckout = (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
  const isSaved: any = await dispatch(deleteCheckout(id));
  if (!isSaved.error) {
    dispatch(fetchCheckouts());
    setVisible(prev => !prev);
  }
};